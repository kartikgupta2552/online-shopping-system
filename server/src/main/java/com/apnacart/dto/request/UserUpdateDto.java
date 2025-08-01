package com.apnacart.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateDto {

	@Size(min = 2, max = 50, message = "Name must be between 2-50 characters")
	private String userName;
	
	@Email(message = "provide a valid email address")
	@Size(max = 100, message = "Email too long")
	private String email;
	
	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Please provide a valid Indian mobile number")
	private String mobileNo;
	
	@Size(max = 500, message = "Address is too long")
	private String address;
	
	//skipped = password,status, role
	
}//UserUpdateDto ends
