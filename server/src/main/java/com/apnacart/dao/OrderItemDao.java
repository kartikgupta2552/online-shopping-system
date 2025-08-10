package com.apnacart.dao;

import com.apnacart.entity.OrderItem;
import com.apnacart.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderItemDao extends JpaRepository<OrderItem, Long> {
    // All items in an order
    List<OrderItem> findByOrder_OrderId(Long orderId);

    // (Optional) All order items for a given product (to see, e.g., total sales for a product)
    List<OrderItem> findByProduct_ProductId(Long productId);
}//OrderItemDao ends
