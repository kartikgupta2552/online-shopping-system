package com.apnacart.dto.response;

import com.apnacart.entity.UserRole;
import com.apnacart.entity.UserStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * response dto for user authentication - login
 * contains JWT token and basic user information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponseDto {
	private String token; // JWT token for authorization
	private String tokenType; // always "Bearer" for JWT
	private Long userId;
	private String email;
	private String userName;
	private String userRole;
	private String userStatus;
	private String message; //success message

}//AuthenticationResponseDto ends
