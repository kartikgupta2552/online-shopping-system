package com.apnacart.entity;

public enum UserStatus {
	/* 
		Can login and use all features
		Can place orders
		Can browse products
		Everything works normally
	 */
	ACTIVE,
	
	/*
	  	User clicked “Deactivate Account”
	  	soft delete account
		Can be reactivated by user request
		Temporary suspension
	 */
	INACTIVE,
	
	/*
	  	Admin blocked them for policy violations
		Fake orders, abusive behavior, fraud attempts
		Cannot login until admin unblocks them
	 */
	BLOCKED
}
