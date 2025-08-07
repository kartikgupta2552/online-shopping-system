package com.apnacart.service;

import com.apnacart.dto.response.OrderItemResponseDto;

import java.util.List;

public interface OrderItemService {
    List<OrderItemResponseDto> getOrderItemsByOrderId(Long orderId); // for order detail views (admin/user)
    // Add update/delete if you foresee returns/corrections
}//OrderItemService ends
