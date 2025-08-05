package com.apnacart.util;

import com.apnacart.dao.OrderDao;
import com.apnacart.dao.UserDao;
import com.apnacart.dto.request.OrderRequestDto;
import com.apnacart.dto.response.OrderResponseDto;
import com.apnacart.entity.Order;
import com.apnacart.entity.User;
import com.apnacart.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderMapper {

    private final UserDao userDao;

    //convert OrderRequestDto to Order
    public Order toOrder(OrderRequestDto orderRequestDto){
        Order order = new Order();
        User user = userDao.findActiveUserById(orderRequestDto.getUserId())
                .orElseThrow(()-> new UserNotFoundException("No such user found!"));
        order.setUser(user);
        order.setDeliveryDate(orderRequestDto.getDeliveryDate());
        return order;
    }//toOrder() ends


    //convert Order to OrderResponseDto
    public OrderResponseDto toOrderResponseDto(Order order){
        OrderResponseDto orderResponseDto = new OrderResponseDto();
        orderResponseDto.setOrderId(order.getOrderId());
        orderResponseDto.setOrderDate(order.getOrderDate());
        orderResponseDto.setDeliveryDate(order.getDeliveryDate());
        orderResponseDto.setUpdatedAt(order.getUpdatedAt());
        orderResponseDto.setStatus(order.getStatus());
        User user = order.getUser();
        if(!user.isActive())
            throw new UserNotFoundException("no such user!");
        orderResponseDto.setUserId(user.getUserId());
        return orderResponseDto;
    }//toOrderResponseDto() ends

}//OrderMapper class ends
