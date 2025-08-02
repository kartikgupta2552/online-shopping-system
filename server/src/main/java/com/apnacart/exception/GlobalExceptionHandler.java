package com.apnacart.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.apnacart.payload.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handles validation errors like @NotBlank
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(
                (e) -> errors.put(e.getField(), e.getDefaultMessage()));
        
        return new ResponseEntity<>(ApiResponse.<Void>error("Validation failed",errors), HttpStatus.BAD_REQUEST);
    }

    // Handles any custom or unknown error (uncheck exceptions)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Void>> handleRuntimeException(RuntimeException ex){
        
        return new ResponseEntity<>(ApiResponse.<Void>error(ex.getMessage(),null), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
