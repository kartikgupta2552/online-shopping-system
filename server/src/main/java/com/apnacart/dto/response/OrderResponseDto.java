package com.apnacart.dto.response;

import com.apnacart.entity.OrderStatus;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class OrderResponseDto {
    private Long orderId;
    private LocalDateTime orderDate;
    private LocalDateTime deliveryDate;
    private LocalDateTime updatedAt;
    private OrderStatus status;
    private Long userId;
}//OrderResponseDto ends
