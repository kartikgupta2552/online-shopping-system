package com.apnacart.dto.response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemResponseDto {
    private Long orderItemId;
    private Long productId;
    private String productName;
    private String imagePath;
    private double priceAtOrder;
    private int quantity;
}//OrderItemResponseDto ends