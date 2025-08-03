package com.apnacart.service;

import java.util.List;

import com.apnacart.dto.request.ProductRequestDto;
import com.apnacart.dto.response.ProductResponseDto;

public interface ProductService {
    
    ProductResponseDto createProduct(ProductRequestDto dto);

    ProductResponseDto getProductById(Long productId);

    List<ProductResponseDto> getAllProducts();

    ProductResponseDto updateProduct(Long productId, ProductRequestDto dto);

    void deleteProduct(Long productId);

}
