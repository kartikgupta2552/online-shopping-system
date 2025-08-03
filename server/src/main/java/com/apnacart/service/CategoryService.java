package com.apnacart.service;

import java.util.List;

import com.apnacart.dto.request.CategoryRequestDto;
import com.apnacart.dto.response.CategoryResponseDto;

public interface CategoryService {
	
	CategoryResponseDto createCategory(CategoryRequestDto dto);
	
	CategoryResponseDto getCategoryById(Long id);
    
    List<CategoryResponseDto> getAllCategories();
    
    CategoryResponseDto updateCategory(Long id, CategoryRequestDto dto);
    
    void deleteCategory(Long id);

}
