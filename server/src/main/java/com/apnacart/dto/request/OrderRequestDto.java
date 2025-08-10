package com.apnacart.dto.request;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderRequestDto {
    private LocalDateTime deliveryDate;
    private Long userId;
    private List<OrderItemRequestDto> orderItems;
}//OrderRequestDto ends
