package com.apnacart.service.impl;

import com.apnacart.dao.OrderDao;
import com.apnacart.dao.UserDao;
import com.apnacart.dto.request.OrderRequestDto;
import com.apnacart.dto.response.OrderResponseDto;
import com.apnacart.entity.Order;
import com.apnacart.entity.OrderStatus;
import com.apnacart.entity.User;
import com.apnacart.exception.UserNotFoundException;
import com.apnacart.service.OrderService;

import com.apnacart.util.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderDao orderDao;
    private final ModelMapper modelMapper;
    private final UserDao userDao;
    private final OrderMapper orderMapper;

    @Override
    public OrderResponseDto createOrder(OrderRequestDto orderRequestDto) {
        Order order = orderMapper.toOrder(orderRequestDto);
        Order newOrder = orderDao.save(order);
        return orderMapper.toOrderResponseDto(newOrder);
    }//createOrder() ends

    @Override
    public OrderResponseDto getOrderById(Long orderId) {
        Order order = orderDao.findById(orderId)
                .orElseThrow(()-> new RuntimeException("No such order"));
        return orderMapper.toOrderResponseDto(order);
    }//getOrderById() ends

    @Override
    public List<OrderResponseDto> getAllOrders() {
        return orderDao.findAll()
                .stream()
                .map(orderMapper::toOrderResponseDto)
                .toList();
    }//getAllOrders() ends

    @Override
    public OrderResponseDto updateOrder(Long orderId, OrderRequestDto orderRequestDto) {
        return null;
    }

    @Override
    public void deleteOrder(Long orderId) {
    }//deleteOrder() ends

    @Override
    public boolean softDeleteOrder(Long orderId) {
        Order order = orderDao.findById(orderId)
                .orElseThrow(()-> new RuntimeException("No such order found!"));
        if(order.getStatus() == OrderStatus.CANCELLED)
            throw new RuntimeException("The order with id " + orderId + " is already cancelled!");
        order.setStatus(OrderStatus.CANCELLED);
        orderDao.save(order);
        return true;
    }
}//OrderServiceImpl ends
