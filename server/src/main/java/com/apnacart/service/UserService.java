package com.apnacart.service;

import java.util.List;

import com.apnacart.dto.request.UserLoginDto;
import com.apnacart.dto.request.UserRegistrationDto;
import com.apnacart.dto.request.UserUpdateDto;
import com.apnacart.dto.response.AuthenticationResponseDto;
import com.apnacart.dto.response.UserResponseDto;
import com.apnacart.entity.UserStatus;

public interface UserService {
	
	//utility methods for controller
    boolean isEmailAvailable(String email);
    boolean isMobileNoAvailable(String mobileNo);
	
	//dto-based methods
	UserResponseDto registerUser(UserRegistrationDto registrationDto);
	UserResponseDto updateUser(Long userId, UserUpdateDto updateDto);
	UserResponseDto getActiveUserById(Long userId);  //get user by id
	AuthenticationResponseDto authenticateUser(UserLoginDto loginDto); //user login - get user by email and password
	void softDeleteUser(Long userId);

	//admin functionalities
	void reactivateUser(Long userId);
	void deleteUser(Long userId);
	UserResponseDto changeUserStatus(Long userId, UserStatus status); //admin functionality
	List<UserResponseDto> getAllActiveUsers(); //get all active users
	List<UserResponseDto> getUsersByStatus(UserStatus status); //admin functionality

}//UserService interface ends
