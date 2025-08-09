package com.apnacart.util;

import com.apnacart.dao.ProductDao;
import com.apnacart.dao.UserDao;
import com.apnacart.dto.request.OrderItemRequestDto;
import com.apnacart.dto.request.OrderRequestDto;
import com.apnacart.dto.response.OrderItemResponseDto;
import com.apnacart.dto.response.OrderResponseDto;
import com.apnacart.entity.*;
import com.apnacart.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class OrderMapper {

    private final UserDao userDao;
    private final ProductDao productDao;

    //convert OrderRequestDto to Order
    public Order toOrder(OrderRequestDto orderRequestDto) {
        //validate if the user is present/active and not blocked or non-existent
        User user = userDao.findActiveUserById(orderRequestDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("No such user or user inactive with id : " + orderRequestDto.getUserId()));

        //retrieve list of the orderItems
        List<OrderItem> orderItems = orderRequestDto.getOrderItems()
                .stream()
                .map(itemDto -> {
                    Product product = productDao.findById(itemDto.getProductId())
                            .orElseThrow(()-> new ResourceNotFoundException("No such product exists with id : " + itemDto.getProductId()));
                    OrderItem orderItem = new OrderItem();
                    orderItem.setProduct(product);
                    orderItem.setQuantity(itemDto.getQuantity());
                    orderItem.setPriceAtOrder(product.getPrice());
                    return orderItem;
                })
                .toList();

        Order order = new Order();
        order.setOrderItems(orderItems);
        order.setUser(user);
        order.setStatus(OrderStatus.NEW);
        orderItems.forEach(item -> item.setOrder(order));

        return order;

    }//toOrder() ends


    //convert Order to OrderResponseDto
    public OrderResponseDto toOrderResponseDto(Order order) {
        OrderResponseDto dto = new OrderResponseDto();
        dto.setOrderId(order.getOrderId());
        dto.setOrderDate(order.getOrderDate());
        dto.setDeliveryDate(order.getDeliveryDate());
        dto.setUpdatedAt(order.getUpdatedAt());
        dto.setStatus(order.getStatus());
        dto.setUserName(order.getUser().getUserName());
        dto.setEmail(order.getUser().getEmail());
        User user = order.getUser();
        if (!user.isActive())
            throw new ResourceNotFoundException("no such user! or user is banned/inactive");
        dto.setUserId(user.getUserId());

        //get all the purchased items in the order
        List<OrderItemResponseDto> itemDtos = order.getOrderItems()
                .stream()
                .map(item -> {
                    OrderItemResponseDto d = new OrderItemResponseDto();
                    d.setOrderItemId(item.getOrderItemId());
                    d.setProductId(item.getProduct().getProductId());
                    d.setProductName(item.getProduct().getProductName());
                    d.setImagePath(item.getProduct().getImagePath());
                    d.setPriceAtOrder(item.getPriceAtOrder());
                    d.setQuantity(item.getQuantity());
                    return d;
                })
                .toList();
        //save list of orderItems to the orderResponseDto
        dto.setOrderItems(itemDtos);

        //calculate total order amount
        double total = order.getOrderItems()
                .stream()
                .mapToDouble(item -> item.getPriceAtOrder() * item.getQuantity())
                .sum();

        dto.setTotalAmount(total);
        return dto;
    }//toOrderResponseDto() ends

}//OrderMapper class ends

