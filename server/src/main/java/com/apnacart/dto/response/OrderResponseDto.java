package com.apnacart.dto.response;

import com.apnacart.entity.OrderStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponseDto {
    private Long orderId;
    private LocalDateTime orderDate;
    private LocalDateTime deliveryDate;
    private LocalDateTime updatedAt;
    private OrderStatus status;
    private Long userId;
    private List<OrderItemResponseDto> orderItems;
    private String userName;
    private String email;
    private double totalAmount;
}//OrderResponseDto ends
