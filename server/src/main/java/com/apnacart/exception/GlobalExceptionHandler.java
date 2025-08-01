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
//marks this class as global exception handler for all controllers
//@ControllerAdvice + @ResponseBody = responses directly return JSON instead of views
public class GlobalExceptionHandler {

	//handle validation errors(@Valid annotation failures)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	//This exception happens when Spring validation on a @Valid request body or parameter fails (e.g., constraint violations like @NotNull, @Size, etc.).
	public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationErrors(MethodArgumentNotValidException ex){
		//Creates an empty HashMap named errors that will store field names and their associated validation error messages
		Map<String, String> errors = new HashMap<>();
		
		ex.getBindingResult().getAllErrors().forEach(error -> {
			String fieldName = ((FieldError)error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		
		ApiResponse<Map<String, String>> response = ApiResponse.error("validation failed!");
		response.setData(errors);
		return ResponseEntity.badRequest().body(response);
		
	}//handleValidationErrors() ends
	
	
	/*
		error 400 = bad request = validation failure
	 	error 409 = conflict = user exists already
	 	error 404 = not found = user not found
	 	error 401 = unauthorized = invalid credentials
	 	error 403 = forbidden = account inactive
	 	error 500 = internal server error = other unexpected errors
	*/
	
	
	
	//handle user already exists
	@ExceptionHandler(UserAlreadyExistsException.class)
	public ResponseEntity<ApiResponse<Object>> handleUserAlreadyExists(UserAlreadyExistsException ex){
		ApiResponse<Object> response = ApiResponse.error(ex.getMessage());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		//HttpStatus.CONFLICT = error 409
		//apiresponse is object type because no specific type of object is returned(no object returned at all), hence generic class used
	}//handleUserAlreadyExists() ends
	
	//handle user not found
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ApiResponse<Object>> handleUserNotFound(UserNotFoundException ex){
		ApiResponse<Object> response = ApiResponse.error(ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		//HttpStatus.NOT_FOUND : error 404
	}//handleUserNotFound() ends
	
	//handle invalid credentials
	@ExceptionHandler(InvalidCredentialsException.class)
	public  ResponseEntity<ApiResponse<Object>> handleInvalidCredentials(InvalidCredentialsException ex){
		ApiResponse<Object> response = ApiResponse.error(ex.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		//HttpStatus.UNAUTHORIZED : error 401
	}//handleInvalidCredentials() ends
	
	//handle inactive account
	@ExceptionHandler(AccountInactiveException.class)
	public ResponseEntity<ApiResponse<Object>> handleAccountInactive(AccountInactiveException ex){
		ApiResponse<Object> response = ApiResponse.error(ex.getMessage());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
		//HttpStatus.FORBIDDEN : error 403
	}//handleAccountInactive() ends
	
	//handle all other runtime exceptions
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ApiResponse<Object>> handleRuntimeException(RuntimeException ex){
		ApiResponse<Object> response = ApiResponse.error("An error occourred : " + ex.getMessage());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		//HttpStatus.INTERNAL_SERVER_ERROR : error 500
	}//handleRuntimeException() ends
	
}//GlobalExceptionHandler ends
