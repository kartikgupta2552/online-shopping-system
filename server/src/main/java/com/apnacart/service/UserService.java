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
	List<UserResponseDto> getAllActiveUsers(); //get all users
	AuthenticationResponseDto authenticateUser(UserLoginDto loginDto); //user login - get user by email and password
	UserResponseDto changeUserStatus(Long userId, UserStatus status); //admin functionality
	List<UserResponseDto> getUsersByStatus(UserStatus status); //admin functionality
	void deleteUser(Long userId);
	boolean softDeleteUser(Long userId);
	boolean reactivateUser(Long userId);
	
}//UserService interface ends
