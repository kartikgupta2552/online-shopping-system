package com.apnacart.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ProductRequestDto {

    @NotBlank(message = "Product name is required")
    @Size(max = 50, message = "Product name must be at most 50 characters")
    private String productName;

    @Size(max = 500, message = "Description must be at most 500 characters")
    private String description;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be non-negative")
    private double price;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity must be non-negative")
    private int quantity;

    @NotNull(message = "Subcategory ID is required")
    private Long subCategoryId;

}//ProductRequestDto class ends