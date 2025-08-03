package com.apnacart.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
// same subcategory can't have duplicate product names
@Table(uniqueConstraints = { 
    @UniqueConstraint(columnNames = {"product_name", "sub_category_id"})
})
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(length = 50, nullable = false)
    private String productName;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    @Min(0)
    private double price;

    @Column(nullable = false)
    @Min(0)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "sub_category_id", nullable = false)
    @JsonBackReference
    private SubCategory subCategory;

}
