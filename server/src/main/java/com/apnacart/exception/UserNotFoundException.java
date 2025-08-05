package com.apnacart.exception;

@SuppressWarnings("serial")
/**
 * @deprecated  use ResourceNotFoundException instead
 */
@Deprecated
public class UserNotFoundException extends RuntimeException{
	public UserNotFoundException(String message) {
		super(message);
	}

}//UserNotFoundException ends
