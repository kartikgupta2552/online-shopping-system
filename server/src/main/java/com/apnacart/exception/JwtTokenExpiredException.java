package com.apnacart.exception;

/*
 * when the jwt is expired vs invalid tokens
 * expired token : error 401 -> message : please login again
 * invalid token : error 403 -> message : access denied
 */
public class JwtTokenExpiredException extends RuntimeException{
	public JwtTokenExpiredException(String message) {
		super(message);
	}
	
	public JwtTokenExpiredException(String message, Throwable cause) {
		super(message,cause);
	}
	
}//InvalidOrExpiredToken ends
