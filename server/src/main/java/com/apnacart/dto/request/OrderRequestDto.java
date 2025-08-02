package com.apnacart.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderRequestDto {
    private LocalDateTime deliveryDate;
    private Long userId;
}//OrderRequestDto ends
