package com.apnacart.dto.response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemResponseDto {
    private Long cartItemId;
    private Long productId;
    private String productName;
    private String imagePath;
    private double price;
    private int quantity;
}//CartItemResponseDto ends
