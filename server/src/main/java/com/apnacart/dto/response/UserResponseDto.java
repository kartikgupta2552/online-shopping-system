package com.apnacart.dto.response;

import java.time.LocalDateTime;

import com.apnacart.entity.UserRole;
import com.apnacart.entity.UserStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "User information response(password excluded for security purpose)")
public class UserResponseDto {
	
	@Schema(description = "Unique user identifier", example = "1")
	private Long userId;
	
	@Schema(description = "User's full name", example = "Tushar Mhatre")
	private String userName;
	
	@Schema(description = "User's mobile number", example = "9876543210")
	private String mobileNo;
	
    @Schema(description = "User's email address", example = "tushar@example.com")
	private String email;
    
    @Schema(description = "User's address", example = "Pune, Maharashtra, India")
	private String address;
    
    @Schema(description = "User's role in the system", example = "CUSTOMER")
	private UserRole role;
    
    @Schema(description = "Current account status", example = "ACTIVE")
	private UserStatus status;
    
    @Schema(description = "Account registration timestamp", example = "2025-01-27T10:30:45")
	private LocalDateTime registeredOn;
	
	//skipped password and updatedAt

}//UserResponseDto ends
