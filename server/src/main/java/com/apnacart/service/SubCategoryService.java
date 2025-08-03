package com.apnacart.service;

import java.util.List;

import com.apnacart.dto.request.SubCategoryRequestDto;
import com.apnacart.dto.response.SubCategoryResponseDto;

public interface SubCategoryService {
	
	SubCategoryResponseDto createSubCategory(SubCategoryRequestDto subCategoryDto);
	
	SubCategoryResponseDto getSubCategoryById(Long id);
    
    List<SubCategoryResponseDto> getAllSubCategories();
    
    SubCategoryResponseDto updateSubCategory(Long id, SubCategoryRequestDto subCategoryDto);
    
    void deleteSubCategory(Long id);

}
