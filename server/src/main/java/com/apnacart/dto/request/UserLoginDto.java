package com.apnacart.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginDto {
	
	@NotBlank(message = "email is mandatory")
	@Email(message = "please provide a valid email address")
	private String email;
	
	
	@NotBlank(message = "password is mandatory")
	private String password;

}//UserLoginDto ends
