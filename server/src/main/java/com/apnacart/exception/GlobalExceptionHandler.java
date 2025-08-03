package com.apnacart.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.apnacart.payload.ApiResponse;

@RestControllerAdvice 
//Any exceptions thrown in the REST controllers will be intercepted globally by this class
//marks this class as global exception handler for all controllers
//@ControllerAdvice + @ResponseBody = responses directly return JSON instead of HTML views
public class GlobalExceptionHandler {
	
	
	//===================================================================================================
	
	//handle validation errors(@Valid annotation failures)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	//This exception happens when Spring validation on a @Valid request body or parameter fails (e.g., constraint violations like @NotNull, @Size, etc.).
	public ResponseEntity<ApiResponse<Void>> handleValidationErrors(MethodArgumentNotValidException ex){
		//Creates an empty HashMap named errors that will store field names and their associated validation error messages
		Map<String, String> errors = new HashMap<>();
		
		//getBindingResult() provides access to all the details about validation errors that occurred while binding HTTP request data (like JSON) to your Java objects.
		//This includes which fields failed validation, the error messages, and more.
		ex.getBindingResult().getAllErrors().forEach(error -> {
			String fieldName = ((FieldError)error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		
		ApiResponse<Void> response = ApiResponse.error("validation failed!",errors);
		//response.setData(errors);
		return ResponseEntity.badRequest().body(ApiResponse.<Void>error("validation failed!", errors));
		//
		
	}//handleValidationErrors() ends
	
	//===================================================================================================
	
	/*
		error 400 = bad request = validation failure
	 	error 409 = conflict = user exists already
	 	error 404 = not found = user not found
	 	error 401 = unauthorized = invalid credentials
	 	error 403 = forbidden = account inactive
	 	error 500 = internal server error = other unexpected errors
	*/
	
	//===================================================================================================
	//user related exceptions
	
	//handle user already exists
	@ExceptionHandler(UserAlreadyExistsException.class)
	public ResponseEntity<ApiResponse<Object>> handleUserAlreadyExists(UserAlreadyExistsException ex){
		ApiResponse<Object> response = ApiResponse.error("User already exists!",ex.getMessage());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		//HttpStatus.CONFLICT = error 409
		//apiresponse is object type because no specific type of object is returned(no object returned at all), hence object class used
	}//handleUserAlreadyExists() ends
	
	//handle user not found
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ApiResponse<Object>> handleUserNotFound(UserNotFoundException ex){
		ApiResponse<Object> response = ApiResponse.error("No such user found!",ex.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		//HttpStatus.UNAUTHORIZED : error 401
	}//handleUserNotFound() ends
	
	//handle invalid credentials
	@ExceptionHandler(InvalidCredentialsException.class)
	public  ResponseEntity<ApiResponse<Object>> handleInvalidCredentials(InvalidCredentialsException ex){
		ApiResponse<Object> response = ApiResponse.error("Invalid Credentials!",ex.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		//HttpStatus.UNAUTHORIZED : error 401
	}//handleInvalidCredentials() ends
	
	//handle inactive account
	@ExceptionHandler(AccountInactiveException.class)
	public ResponseEntity<ApiResponse<Object>> handleAccountInactive(AccountInactiveException ex){
		ApiResponse<Object> response = ApiResponse.error("This account is inactive!",ex.getMessage());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
		//HttpStatus.FORBIDDEN : error 403
	}//handleAccountInactive() ends
	
	//================================================================================================
	//JWT related exceptions
	
	//handle JWT token expired exception
	@ExceptionHandler(JwtTokenExpiredException.class)
	public ResponseEntity<ApiResponse<Object>> handleJwtTokensExpired(JwtTokenExpiredException ex){
		ApiResponse<Object> response = ApiResponse.error("Session expired. Please login again.",ex.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		//HttpStatus.UNAUTHORIZED : error 401
	}//handleJwtTokensExpired() ends
	
	//handle jwt invalid exception
	@ExceptionHandler(JwtTokenInvalidException.class)
	public ResponseEntity<ApiResponse<Object>> handleJwtTokenInvalid(JwtTokenInvalidException ex){
		ApiResponse<Object> response = ApiResponse.error("Invalid token. Access denied",ex.getMessage());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
		//HttpStatus.FORBIDDEN : error 403
	}//handleJwtTokenInvalid() ends
	
	//handle missing jwt token
	@ExceptionHandler(JwtTokenMissingException.class)
	public ResponseEntity<ApiResponse<Object>> handleJwtTokenMissing(JwtTokenMissingException ex){
		ApiResponse<Object> response = ApiResponse.error("Authentication required. Please login to access this page.",ex.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		//HttpStatus.UNAUTHORIZED : error 401
	}//handleJwtTokenMissing() ends
	
	//================================================================================================
	//all other miscellaneous exceptions
	
	//handle all other runtime exceptions
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ApiResponse<Object>> handleRuntimeException(RuntimeException ex){
		ApiResponse<Object> response = ApiResponse.error("An error occurred.",ex.getMessage());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		//HttpStatus.INTERNAL_SERVER_ERROR : error 500
	}//handleRuntimeException() ends
	
}//GlobalExceptionHandler ends
