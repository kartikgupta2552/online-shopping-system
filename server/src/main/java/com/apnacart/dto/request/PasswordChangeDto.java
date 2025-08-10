package com.apnacart.dto.request;

import lombok.Data;

@Data
public class PasswordChangeDto {
    private String oldPassword;
    private String newPassword;
    // getters/setters
}//PasswordChangeDto ends
