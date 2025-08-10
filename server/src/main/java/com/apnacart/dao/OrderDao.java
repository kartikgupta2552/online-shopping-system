package com.apnacart.dao;

import com.apnacart.entity.Order;
import com.apnacart.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDao extends JpaRepository<Order,Long> {

    List<Order> findByUser_UserId(Long userId);

    List<Order> findByStatus(OrderStatus status);

    List<Order> findByUser_UserIdAndStatus(Long userId, OrderStatus status);

}//OrderDao ends
