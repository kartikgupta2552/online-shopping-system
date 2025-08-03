package com.apnacart.exception;

//when jwt is missing from the request -> eg. when the user is not logged in
public class JwtTokenMissingException extends RuntimeException{
	public JwtTokenMissingException(String message) {
		super(message);
	}
	
	public JwtTokenMissingException(String message, Throwable cause) {
		super(message, cause);
	}
}//JwtTokenMissingException ends
