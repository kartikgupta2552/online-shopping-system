package com.apnacart.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.apnacart.dto.request.ProductRequestDto;
import com.apnacart.dto.response.ProductResponseDto;
import com.apnacart.payload.ApiResponse;
import com.apnacart.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> addProduct(
            @RequestPart("product") @Valid ProductRequestDto dto,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) throws IOException {
        ProductResponseDto responseDto = productService.createProduct(dto,imageFile);
        return new ResponseEntity<>(ApiResponse.success("Product added successfully", responseDto), HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getProductById(@PathVariable("id") Long id) {
        ProductResponseDto responseDto = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success("Product fetched successfully", responseDto));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getAllProducts() {
        List<ProductResponseDto> products = productService.getAllProducts();
        return ResponseEntity.ok(ApiResponse.success("All product fetched successfully", products));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> updateProduct(@PathVariable("id") Long id, 
        @RequestPart("product") @Valid ProductRequestDto requestDto,
        @RequestPart(value = "image", required = false) MultipartFile imageFile
        ) throws IOException{
        ProductResponseDto responseDto = productService.updateProduct(id, requestDto, imageFile);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", responseDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable("id") Long id) throws IOException{
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getProductsByCategory(@PathVariable("categoryId") Long categoryId){
        List<ProductResponseDto> responseDtos = productService.getProductByCategoryId(categoryId);
        return ResponseEntity.ok(ApiResponse.success("Product fetched successfully by Category", responseDtos));
    }

    @GetMapping("/subcategory/{subCategoryId}")
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getProductBySubCategory(@PathVariable("subCategoryId") Long subCategoryId){
        List<ProductResponseDto> responseDtos = productService.getProductBySubCategoryId(subCategoryId);

        return ResponseEntity.ok(ApiResponse.success("Product fetched successfully by Subcategory", responseDtos));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> searchProducts(@RequestParam String keyword){
        List<ProductResponseDto> responseDtos = productService.searchProducts(keyword);
        return ResponseEntity.ok(ApiResponse.success("Product fetched successfully", responseDtos));
    }
    



}
