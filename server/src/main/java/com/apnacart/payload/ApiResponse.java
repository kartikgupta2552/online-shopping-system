package com.apnacart.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> { //generic wrapper class for sending API responses in a consistent format
	private boolean success;
	private String message;
	private T data;
	private Object error;

	//static factory methods for common responses
	public static <T> ApiResponse<T> success (String message, T data){
		return new ApiResponse<>(true, message, data,null);
	}
	
	public static <T> ApiResponse<T> error(String message,Object error){
		return new ApiResponse<>(false,message, null,error);
	}
	
}//ApiResponse ends
