package com.apnacart.service.impl;


import java.util.List;

import com.apnacart.entity.UserRole;
import com.apnacart.exception.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apnacart.dao.UserDao;
import com.apnacart.dto.request.UserLoginDto;
import com.apnacart.dto.request.UserRegistrationDto;
import com.apnacart.dto.request.UserUpdateDto;
import com.apnacart.dto.response.AuthenticationResponseDto;
import com.apnacart.dto.response.UserResponseDto;
import com.apnacart.entity.User;
import com.apnacart.entity.UserStatus;
import com.apnacart.service.UserService;
import com.apnacart.util.JwtUtil;
import com.apnacart.util.UserMapper;

import lombok.RequiredArgsConstructor;

//import jakarta.transaction.Transactional;

@RequiredArgsConstructor //lombok annotation
@Service
@Transactional //if something goes wrong, all db changes get rolled back!
public class UserServiceImpl implements UserService {
	
	//lombok will automatically generate a constructor with all the final fields
	private final UserDao userDao; //constructor injection -> @RequiredArgsConstructor
	private final UserMapper userMapper; //constructor injection -> @RequiredArgsConstructor
	private final PasswordEncoder passwordEncoder; //constructor injection -> @RequiredArgsConstructor
	private final JwtUtil jwtUtil; // constructor injection -> @RequiredArgsConstructor

	//private helper methods
	@Transactional(readOnly = true)
	private User getUserById(Long userId) {
		return userDao.findByUserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + userId));
	}//getUserById() ends
	
	@Transactional(readOnly = true)
	private User getUserByEmail(String email) {
		return userDao.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email : " + email));
	}//getUserByEmail() ends

	//above are private helper methods

	@Override
	@Transactional(readOnly = true)
	public boolean isEmailAvailable(String email) {
		return !userDao.existsByEmail(email); //returns true if no such email present in the db
	}//isEmailAvailable() ends
	
	@Override
	@Transactional(readOnly = true)
	public boolean isMobileNoAvailable(String mobileNo) {
		return !userDao.existsByMobileNo(mobileNo); //returns true if no such mobile no present in the db
	}//isMobileNoAvailable() ends
	
	@Override
	public void hardDeleteUser(Long userId) {
		//check if user already exists or not
		if(!userDao.existsById(userId)) {
			throw new ResourceNotFoundException("No such user with id : " + userId);
		}
		userDao.deleteById(userId);

	}//hardDeleteUser() ends

	@Override
	public UserResponseDto changeUserStatus(Long userId, UserStatus status) {
		//find the existing user
		User existingUser = getUserById(userId);
		existingUser.setStatus(status);
		User updatedUser = userDao.save(existingUser);
		return userMapper.toResponseDto(updatedUser);
	}//changeUserStatus() ends
	
	

	@Override
	@Transactional(readOnly = true)
	public List<UserResponseDto> getUsersByStatus(UserStatus status) {
		return userDao.findByStatus(status)
				.stream()
				.map(userMapper::toResponseDto)
				.toList();
	}//getUsersByStatus() ends



	//=====================================================================================================================
	
	//new dto-based registration method
	@Override
	public UserResponseDto registerUser(UserRegistrationDto registrationDto) {
		//validate email availability
		if(!isEmailAvailable(registrationDto.getEmail())) {
			throw new ResourceAlreadyExistsException("this email already exists : " + registrationDto.getEmail());
		}
		
		//validate mobileNo availability
		if(!isMobileNoAvailable(registrationDto.getMobileNo())) {
			throw new ResourceAlreadyExistsException("this mobile no already exists : " + registrationDto.getMobileNo());
		}
		
		//convert dto to user entity
		User user = userMapper.toEntity(registrationDto);
		
		//hash password using BCrypt before storing it to db
		String hashedPassword = passwordEncoder.encode(registrationDto.getPassword());
		user.setPassword(hashedPassword);
		
		//save user
		User savedUser = userDao.save(user);
		
		//convert user entity to response dto
		return userMapper.toResponseDto(savedUser);
		
	}//registerUser() ends

	

	@Override
	public UserResponseDto updateUser(Long userId, UserUpdateDto updateDto) {
		
		//find the existing user
		User existingUser = getUserById(userId);
		
		//validate email exists if it is being changed
		if(updateDto.getEmail()!=null && !existingUser.getEmail().equals(updateDto.getEmail())) {
			if(!isEmailAvailable(updateDto.getEmail())) {
				throw new ResourceAlreadyExistsException("this email already exists : " + updateDto.getEmail());
			}
		}
		
		//validate mobile no exists
		if(updateDto.getMobileNo()!=null && !existingUser.getMobileNo().equals(updateDto.getMobileNo())) {
			if(!isMobileNoAvailable(updateDto.getMobileNo())) {
				throw new ResourceAlreadyExistsException("this mobile number already exists : " + updateDto.getMobileNo());
			}
		}
		
		//update the existing entity with dto data
		userMapper.updateEntity(existingUser, updateDto);
		
		//save and return the dto
		User updatedUser = userDao.save(existingUser);
		return userMapper.toResponseDto(updatedUser);
	}//updateUser() ends

	//dto-based getter methods
	@Override
	@Transactional(readOnly = true)
	public UserResponseDto getActiveUserById(Long userId) {
		User user = userDao.findActiveUserById(userId)
				.orElseThrow(()-> new ResourceNotFoundException("No such user found!"));
		return userMapper.toResponseDto(user);
	}//getUserResponseById() ends

	@Override
	@Transactional(readOnly = true)
	public List<UserResponseDto> getAllActiveUsers() {
		return userDao.findActiveUsers()
				.stream()
				.map(userMapper::toResponseDto)
				.toList();
	}//getAllUserResponses() ends

	/**
	 * @return users of all types
	 */
	@Override
	public List<UserResponseDto> getAllUsers() {
		return userDao.findAll()
				.stream()
				.map(userMapper::toResponseDto)
				.toList();
	}//getAllUsers() ends

	@Override
	public AuthenticationResponseDto authenticateUser(UserLoginDto loginDto) {
		//1. find user by email
		User user = userDao.findByEmail(loginDto.getEmail())
				.orElseThrow(()-> new InvalidCredentialsException("invalid email or password!"));
		
		//2. verify password using bcrypt
		boolean passwordMatches = passwordEncoder.matches(loginDto.getPassword(), user.getPassword());
		
		if(!passwordMatches) {
			throw new InvalidCredentialsException("invalid email or password");
		}
		
		//3. check if the user is active(blocked user cannot login!)
		if(user.getStatus() != UserStatus.ACTIVE) {
			throw new AccountInactiveException("This Account is " + user.getStatus().toString().toLowerCase() + 
					". Please contact support.");
		}
		
		//4. Generate JWT token
		String jwtToken = jwtUtil.generateToken(
				user.getUserId(), //userId for database operations
				user.getEmail(), // email passed as token subject
				user.getRole().name(), //role for authorization
				user.getStatus().name()
				);
		
		//5. return user info and token
		return new AuthenticationResponseDto(
				jwtToken, //jwt token
				"Bearer", //token type
				user.getUserId(),
				user.getEmail(),
				user.getUserName(),
				user.getRole().name(),
				user.getStatus().name(),
				"Login successful!"
				);
		
	}//authenticateUser() ends

	@Override
	public void softDeleteUser(Long userId) {
		User user = userDao.findById(userId)
				.orElseThrow( () -> new ResourceNotFoundException("no such user found"));
		user.setStatus(UserStatus.INACTIVE);
		
		userDao.save(user);
	}//softDeleteUser() ends

	@Override
	public void reactivateUser(Long userId) {
		User user = userDao.findById(userId)
				.orElseThrow(()-> new ResourceNotFoundException("No such user found!"));
		
		if(user.getStatus() == UserStatus.ACTIVE) {
			throw new ResourceAlreadyExistsException("The user " + user.getUserName() + " with id " + userId + " is already active!");
		}
		user.setStatus(UserStatus.ACTIVE);
		userDao.save(user);
	}//reactivateUser() ends

	/**
	 * @param userId
	 * @param role
	 * @return UserResponseDto
	 */
	@Override
	public UserResponseDto changeUserRole(Long userId, UserRole role) {
		//fetch user by id
		User user = getUserById(userId);
		//set the new role
		user.setRole(role);
		//save the changes
		User updatedUser = userDao.save(user);
		return userMapper.toResponseDto(updatedUser);
	}//changeUserRole() ends


}//UserServiceImpl ends
