package com.apnacart.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "user registration request payload")
public class UserRegistrationDto {
	
	@Schema(description = "Users full name", example = "Tushar Mhatre")
	@NotBlank(message = "name is mandatory")
	@Size(min = 2, max = 50, message = "name must be between 2-50 characters")
	private String userName;
	
	@Schema(description = "User's email address", example = "example@email.com")
	@NotBlank(message = "email is mandatory")
	@Email(message = "please provide a valid email address")
	@Size(max = 100, message = "email too long! provide email under 100 characters")
	private String email;
	
	@Schema(description = "10 digit mobile number (starting with 6-9)", example = "9765434210")
	@NotBlank(message = "mobile number is mandatory")
	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Please provide a valid Indian mobile number")
	//validation - first digit must be between 6 and 9,followed by exactly 9 digits
	private String mobileNo;
	
	@Schema(description = "strong password with atleast one uppercase, lowercase, number and special character", example = "Password@123")
	@NotBlank(message = "password is mandatory!!!")
	@Size(min = 8, max = 20,message = "password must be 8-20 characters long")
	@Pattern(
	        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&].*$",
	        message = "Password must contain at least one uppercase, one lowercase, one number, and one special character")
	private String password;
	
	@Schema(description = "User's address (optional)", example = "Pune, Maharashtra, India")
	@Size(max = 500, message = "address must be under 500 characters")
	private String address;

}//UserRegistrationDto class ends
