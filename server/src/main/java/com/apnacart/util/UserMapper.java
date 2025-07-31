package com.apnacart.util;

import org.springframework.stereotype.Component;

import com.apnacart.dto.request.UserRegistrationDto;
import com.apnacart.dto.request.UserUpdateDto;
import com.apnacart.dto.response.UserResponseDto;
import com.apnacart.entity.User;


@Component
public class UserMapper {
	
	//convert UserRegistrationDto to User entity
	public User toEntity(UserRegistrationDto dto) {
		User user = new User();
		user.setUserName(dto.getUserName());
		user.setEmail(dto.getEmail());
		user.setMobileNo(dto.getMobileNo());
		user.setPassword(dto.getPassword()); //to be hashed in the service layer
		user.setAddress(dto.getAddress());
		//role and status are set by default in the user entity when it is created.
		return user;
	}//toEntity() ends
	
	//convert User entity to UserResponseDto
	public UserResponseDto toResponseDto(User user) {
		UserResponseDto dto = new UserResponseDto();
		dto.setUserId(user.getUserId());
		dto.setUserName(user.getUserName());
		dto.setEmail(user.getEmail());
		dto.setMobileNo(user.getMobileNo());
		dto.setAddress(user.getAddress());
		dto.setRole(user.getRole());
		dto.setStatus(user.getStatus());
		dto.setRegisteredOn(user.getCreatedAt());
		return dto;
	}//toResponseDto() ends
	
	//update existing user entity with UserUpdateDto
	public void updateEntity(User existingUser,UserUpdateDto dto) {
		//update only non-null fields => partial updates
		if(dto.getUserName()!=null) {
			existingUser.setUserName(dto.getUserName());
		}
		
		if(dto.getEmail()!=null) {
			existingUser.setEmail(dto.getEmail());
		}
		
		if(dto.getMobileNo()!=null) {
			existingUser.setMobileNo(dto.getMobileNo());
		}
		
		if(dto.getAddress()!=null) {
			existingUser.setAddress(dto.getAddress());
		}
	}//updateEntity() ends
	
	
}//UserMapper() ends
