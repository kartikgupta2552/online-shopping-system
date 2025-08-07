package com.apnacart.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class CartItem {
    @Id
    @GeneratedValue
    private Long cartItemId;

    @ManyToOne
    @JoinColumn(name="cart_id", nullable = false) // Always in a cart
    private Cart cart;

    @ManyToOne
    @JoinColumn(name="product_id", nullable = false) // Always a product
    private Product product;

    @Column(nullable = false)
    private int quantity;
}//CartItem ends