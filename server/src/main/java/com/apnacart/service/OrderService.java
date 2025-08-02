package com.apnacart.service;

import com.apnacart.dto.request.OrderRequestDto;
import com.apnacart.dto.response.OrderResponseDto;

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
    void deleteOrder(Long orderId);
    boolean softDeleteOrder(Long orderId);

}//OrderService ends
