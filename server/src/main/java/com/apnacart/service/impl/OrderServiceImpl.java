package com.apnacart.service.impl;

import com.apnacart.dao.OrderDao;
import com.apnacart.dao.UserDao;
import com.apnacart.dto.request.OrderRequestDto;
import com.apnacart.dto.response.OrderResponseDto;
import com.apnacart.entity.Order;
import com.apnacart.entity.OrderStatus;
import com.apnacart.exception.ResourceAlreadyExistsException;
import com.apnacart.exception.ResourceNotFoundException;
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
                .orElseThrow(()-> new ResourceNotFoundException("No such order with id : " + orderId));
        return orderMapper.toOrderResponseDto(order);
    }//getOrderById() ends


    @Override
    public OrderResponseDto updateOrder(Long orderId, OrderRequestDto orderRequestDto) {
        return null;
    }//updateOrder() ends

    @Override
    public List<OrderResponseDto> viewOrdersByUserId(Long userId) {
        return List.of();
    }//viewOrdersByUserId() ends

    @Override
    public void cancelOrder(Long orderId) {
        Order order = orderDao.findById(orderId)
                .orElseThrow(()-> new ResourceNotFoundException("No such order found with id : " + orderId));
        if(order.getStatus() == OrderStatus.CANCELLED)
            throw new ResourceAlreadyExistsException("The order with id " + orderId + " is already cancelled!");
        order.setStatus(OrderStatus.CANCELLED);
        orderDao.save(order);
    }//softDeleteOrder() ends



    //==================================================================================================================
    //-----------admin functionality---------------

    @Override
    public OrderResponseDto changeOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderDao.findById(orderId)
                .orElseThrow(()-> new ResourceNotFoundException("No such order exists with id : " + orderId));
        order.setStatus(status);
        orderDao.save(order);
        return orderMapper.toOrderResponseDto(order);
    }//changeOrderStatus() ends

    //permanently deletes order
    @Override
    public void deleteOrder(Long orderId) {
        if(!orderDao.existsById(orderId))
            throw new ResourceNotFoundException("No such order exists with id : " + orderId);
        orderDao.deleteById(orderId);
    }//deleteOrder() ends

    @Override
    public List<OrderResponseDto> getAllOrders() {
        return orderDao.findAll()
                .stream()
                .map(orderMapper::toOrderResponseDto)
                .toList();
    }//getAllOrders() ends


}//OrderServiceImpl ends
