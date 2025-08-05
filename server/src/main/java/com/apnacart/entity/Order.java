package com.apnacart.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime orderDate;

    private LocalDateTime deliveryDate; //can be null before delivery

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne //One user can have many orders
    @JoinColumn(name="user_id",nullable = false) //user_id column created
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.NEW;

}//Order ends
