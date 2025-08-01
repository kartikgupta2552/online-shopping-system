package com.apnacart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apnacart.dto.request.CategoryRequestDto;
import com.apnacart.dto.response.CategoryResponseDto;
import com.apnacart.payload.ApiResponse;
import com.apnacart.service.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Add Category
    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponseDto>> addCategory(
            @RequestBody @Valid CategoryRequestDto categoryRequestDto) {
        CategoryResponseDto createdCategory = categoryService.createCategory(categoryRequestDto);
        ApiResponse<CategoryResponseDto> apiResponse = new ApiResponse<>(true, "Category Added Successfully",
                createdCategory, null);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse); // 201 Created
    }

    // Get by Id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponseDto>> getCategoryById(@PathVariable("id") Long id) {
        CategoryResponseDto dto = categoryService.getCategoryById(id);
        ApiResponse<CategoryResponseDto> apiResponse = new ApiResponse<>(true, "Category fetched Successfully", dto,
                null);
        return ResponseEntity.ok(apiResponse); // 200 OK
    }

    // Get All Categories
    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponseDto>>> getAllCategories() {
        List<CategoryResponseDto> list = categoryService.getAllCategories();
        ApiResponse<List<CategoryResponseDto>> apiResponse = new ApiResponse<>(true,
                "All categories fetched successfully", list, null);
        return ResponseEntity.ok(apiResponse); // 200 OK
    }

    // Update Category
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponseDto>> updateCategory(@PathVariable("id") Long id,
            @RequestBody @Valid CategoryRequestDto categoryRequestDto) {
        CategoryResponseDto updatedCategory = categoryService.updateCategory(id, categoryRequestDto);
        ApiResponse<CategoryResponseDto> apiResponse = new ApiResponse<>(true, "Category updated successfully",
                updatedCategory, null);
        return ResponseEntity.ok(apiResponse); // 200 OK
    }

    // Delete Category
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteCategory(@PathVariable("id") Long id) {
        categoryService.deleteCategory(id);
        ApiResponse<Object> apiResponse = new ApiResponse<>(true, "Category deleted successfully", null, null);
        return ResponseEntity.ok(apiResponse);
    }

}
