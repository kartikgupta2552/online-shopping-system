package com.apnacart.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class OrderItem {
    @Id
    @GeneratedValue
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id",nullable = false) // must be attached to an order
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false) //must point to a product
    private Product product;

    @Column(nullable = false) // ★ You must buy some quantity!
    private int quantity;

    @Column(nullable = false) // price must be known at order time
    private double priceAtOrder; // store product price at order time!
}//OrderItem ends
