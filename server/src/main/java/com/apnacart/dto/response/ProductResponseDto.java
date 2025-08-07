package com.apnacart.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDto {

    private Long productId;

    private String productName;

    private String description;

    private double price;

    private int quantity;

    private Long subCategoryId;

    private String imagePath;

}//ProductResponseDto class ends