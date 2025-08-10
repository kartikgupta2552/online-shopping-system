package com.apnacart.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.apnacart.dto.request.ProductRequestDto;
import com.apnacart.dto.response.ProductResponseDto;

public interface ProductService {
    
    ProductResponseDto createProduct(ProductRequestDto dto, MultipartFile imageFile) throws IOException ;

    ProductResponseDto getProductById(Long productId);

    List<ProductResponseDto> getAllProducts();

    ProductResponseDto updateProduct(Long productId, ProductRequestDto dto, MultipartFile imageFile) throws IOException;

    void deleteProduct(Long productId) throws IOException;

    List<ProductResponseDto> getProductByCategoryId(Long categoryId);

    List<ProductResponseDto> getProductBySubCategoryId(Long subCategoryId);

    List<ProductResponseDto> searchProducts(String keyword);

}//ProductService interface ends