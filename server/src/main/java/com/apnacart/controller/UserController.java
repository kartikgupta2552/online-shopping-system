package com.apnacart.controller;

import java.util.List;

import com.apnacart.exception.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apnacart.dto.request.UserLoginDto;
import com.apnacart.dto.request.UserRegistrationDto;
import com.apnacart.dto.request.UserUpdateDto;
import com.apnacart.dto.response.AuthenticationResponseDto;
import com.apnacart.dto.response.UserResponseDto;
import com.apnacart.entity.UserStatus;
import com.apnacart.payload.ApiResponse;
import com.apnacart.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")//for react frontend
@Tag(name = "User Management", description = "APIs for user related functions like registration, authentication and profile management")
public class UserController {
	
	private final UserService userService;
	

	//swagger documentation
	
	@Operation(
			summary = "Register new user",
			description = "creates a new user account with encrypted password and validates unique email and mobile number"
			)
	@ApiResponses(value = {
			@io.swagger.v3.oas.annotations.responses.ApiResponse(
					responseCode = "201",
					description = "User registered succesfully",
					content = @Content(
			                mediaType = "application/json",
			                schema = @Schema(implementation = ApiResponse.class),
			                examples = @ExampleObject(
			                    value = """
			                    {
			                        "success": true,
			                        "message": "User registered successfully",
			                        "data": {
			                            "userId": 1,
			                            "userName": "Tushar Mhatre",
			                            "email": "tushar@example.com",
			                            "mobileNo": "9876543210",
			                            "role": "CUSTOMER",
			                            "status": "ACTIVE",
			                            "registeredOn": "2025-01-27T10:30:45"
			                        }
			                    }
			                    """
			                )
			            )
			        ),
			@io.swagger.v3.oas.annotations.responses.ApiResponse(
		            responseCode = "400",
		            description = "Validation failed - Invalid input data",
		            content = @Content(
		                mediaType = "application/json",
		                examples = @ExampleObject(
		                    value = """
		                    {
		                        "success": false,
		                        "message": "Validation failed",
		                        "data": {
		                            "email": "Please provide a valid email address",
		                            "password": "Password must contain at least one uppercase letter"
		                        }
		                    }
		                    """
		                )
		            )
		        ),
			@io.swagger.v3.oas.annotations.responses.ApiResponse(
		            responseCode = "409",
		            description = "User already exists - Email or mobile number already registered",
		            content = @Content(
		                mediaType = "application/json",
		                examples = @ExampleObject(
		                    value = """
		                    {
		                        "success": false,
		                        "message": "Email already exists: user@example.com",
		                        "data": null
		                    }
		                    """
		                )
		            )
		        )
	})

	// register new user
	@PostMapping("/register")
	public ResponseEntity<ApiResponse<UserResponseDto>> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto){
		//@valid enables validation on the objects/fields(nested as well)
			UserResponseDto user = userService.registerUser(registrationDto);
			ApiResponse<UserResponseDto> response = ApiResponse.success("User registered successfully", user);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);

	}//registerUser() ends
	
	
	@Operation(
			summary = "Update user profile",
			description = "updates user profile with validations for user email/mobile number."
			)
	// update user profile
	@PutMapping("/{userId}/profile")
	public ResponseEntity<ApiResponse<UserResponseDto>> updateUserProfile(@PathVariable Long userId,
			@Valid @RequestBody UserUpdateDto updateDto) {
			UserResponseDto user = userService.updateUser(userId, updateDto);
			ApiResponse<UserResponseDto> response = ApiResponse.success("User updated successfully", user);
			return ResponseEntity.ok(response);
	}// updateUserProfile() ends
	
	
	@Operation(
			summary = "gets a list of all the users",
			description = "retrieves all the registered users(admin functionality)"
			)
	@ApiResponses(value = {
			@io.swagger.v3.oas.annotations.responses.ApiResponse(
					responseCode = "200",
					description = "Users retrieved successfully",
					content = @Content(
							mediaType = "application/json",
							schema = @Schema(implementation = ApiResponse.class)
							)
					)
	})
	//get all users
	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<UserResponseDto>>> getAllUsers(){
		List<UserResponseDto> users = userService.getAllUsers();
		ApiResponse<List<UserResponseDto>> response = ApiResponse.success("Users retrieved successfully", users);
		return ResponseEntity.ok(response);
	}//getAllUsersClean() ends
	

	@Operation(
	        summary = "User Login",
	        description = "Authenticates user credentials and returns user information (password is verified using BCrypt)"
	    )
	    @ApiResponses(value = {
	        @io.swagger.v3.oas.annotations.responses.ApiResponse(
	            responseCode = "200",
	            description = "Login successful",
	            content = @Content(
	                mediaType = "application/json",
	                examples = @ExampleObject(
	                    value = """
	                    {
	                        "success": true,
	                        "message": "Login successful!",
	                        "data": {
	                            "userId": 1,
	                            "userName": "Tushar Mhatre",
	                            "email": "tushar@example.com",
	                            "role": "CUSTOMER",
	                            "status": "ACTIVE"
	                        }
	                    }
	                    """
	                )
	            )
	        ),
	        @io.swagger.v3.oas.annotations.responses.ApiResponse(
	            responseCode = "401",
	            description = "Invalid credentials",
	            content = @Content(
	                mediaType = "application/json",
	                examples = @ExampleObject(
	                    value = """
	                    {
	                        "success": false,
	                        "message": "Invalid email or password",
	                        "data": null
	                    }
	                    """
	                )
	            )
	        ),
	        @io.swagger.v3.oas.annotations.responses.ApiResponse(
	            responseCode = "403",
	            description = "Account inactive or blocked",
	            content = @Content(
	                mediaType = "application/json",
	                examples = @ExampleObject(
	                    value = """
	                    {
	                        "success": false,
	                        "message": "Account is blocked. Please contact support.",
	                        "data": null
	                    }
	                    """
	                )
	            )
	        )
	    })
	//login authentication
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<AuthenticationResponseDto>> loginUser(@Valid @RequestBody UserLoginDto loginDto){
			AuthenticationResponseDto user = userService.authenticateUser(loginDto);
			ApiResponse<AuthenticationResponseDto> response = ApiResponse.success("User authenticated successfully!", user);
			return ResponseEntity.ok(response);
	}//loginUser() ends
	
	//get user profile
	@Operation(
			summary = "Get user by Id",
			description = "retrieves user information using user Id"
			)
	@GetMapping("/{userId}/profile")
	public ResponseEntity<ApiResponse<UserResponseDto>> getUserProfile(@PathVariable Long userId){
		UserResponseDto user = userService.getActiveUserById(userId);
		ApiResponse<UserResponseDto> response = ApiResponse.success("User retrieved successfully", user);
		return ResponseEntity.ok(response);
	}//getUserProfile() ends
	
	//change user status
	@Operation(
			summary = "Change the user status (Admin functionality)",
			description = "admin functionality to change the user status"
			)
	@PatchMapping("/{userId}/status")
	public ResponseEntity<ApiResponse<UserResponseDto>> changeUserStatus(
			@PathVariable Long userId,
			@RequestParam UserStatus status
			){
		UserResponseDto user = userService.changeUserStatus(userId, status);
		ApiResponse<UserResponseDto> response = ApiResponse.success("User status updated successfully", user);
		return ResponseEntity.ok(response);
	}//changeUserStatus() ends
	
	//get user by status
	@Operation(
			summary = "Get users by status (Admin functionality)",
			description = "admin functionality to fetch  users according to their status"
			)
	@GetMapping("/status/{status}")
	public ResponseEntity<ApiResponse<List<UserResponseDto>>> getUsersByStatus(@PathVariable UserStatus status){
		List<UserResponseDto> users = userService.getUsersByStatus(status);
		ApiResponse<List<UserResponseDto>> response = ApiResponse.success("Users fetched successfully", users);
		return ResponseEntity.ok(response);
	}//getUsersByStatus() ends
	
	//delete user
	@Operation(
			summary = "delete user",
			description = "admin functionality to delete a user"
			)
	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long userId){
		userService.softDeleteUser(userId);
		ApiResponse<String> response = ApiResponse.success("User deleted succesfully", null);
		return ResponseEntity.ok(response);
	}//deleteUser() ends

	
	
}//UserController class ends
