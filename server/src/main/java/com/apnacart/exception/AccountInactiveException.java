package com.apnacart.exception;

@SuppressWarnings("serial")
public class AccountInactiveException extends RuntimeException {
	public AccountInactiveException(String message) {
		super(message);
	}
}//AccountInactiveException ends
