package com.apnacart.exception;

@SuppressWarnings("serial")
/**
 * @deprecated  use ResourceAlreadyExistsException instead
 */
@Deprecated
public class UserAlreadyExistsException extends RuntimeException{
	public UserAlreadyExistsException(String message) {
		super(message);
	}

}//UserAlreadyExistsException ends
