package com.apnacart.service;

import com.apnacart.dto.request.OrderRequestDto;
import com.apnacart.dto.response.OrderResponseDto;
import com.apnacart.entity.OrderStatus;

import java.util.List;

public interface OrderService {

    /*
       CRUD operations :

       Create order
       get order by id
       get all orders
       Update order
       Delete update
    */

    OrderResponseDto createOrder(OrderRequestDto orderRequestDto);
    OrderResponseDto getOrderById(Long orderId);
    List<OrderResponseDto> getAllOrders();
    OrderResponseDto updateOrder(Long orderId, OrderRequestDto orderRequestDto);
    boolean softDeleteOrder(Long orderId);

    //admin functionalitu
    void deleteOrder(Long orderId);
    OrderResponseDto changeOrderStatus(Long orderId, OrderStatus status);
    List<OrderResponseDto> viewOrdersByUserId(Long userId);
}//OrderService ends
