package com.apnacart.exception;

//jwt invalid or tampered with -> this might be considered as a security event!
public class JwtTokenInvalidException extends RuntimeException{
	public JwtTokenInvalidException(String message) {
		super(message);
	}
	
	public JwtTokenInvalidException(String message,Throwable cause) {
		super(message,cause);
	}
	
}//JwtTokenInvalidException
