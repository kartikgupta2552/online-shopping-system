package com.apnacart.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apnacart.dao.CategoryDao;
import com.apnacart.dto.request.CategoryRequestDto;
import com.apnacart.dto.response.CategoryResponseDto;
import com.apnacart.entity.Category;
import com.apnacart.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private CategoryDao categoryDao;

	@Override
	public CategoryResponseDto createCategory(CategoryRequestDto dto) {
		
		Category category = modelMapper.map(dto, Category.class);
		Category createdCategory = categoryDao.save(category);
	
		return modelMapper.map(createdCategory, CategoryResponseDto.class);
	}

	@Override
	public CategoryResponseDto getCategoryById(Long id) {
		Category category = categoryDao.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
		return modelMapper.map(category, CategoryResponseDto.class);
	}

	@Override
	public List<CategoryResponseDto> getAllCategories() {
		List<Category> categories = categoryDao.findAll();
		List<CategoryResponseDto> categoryDtos = new ArrayList<>();
		categories.forEach((e) -> categoryDtos.add(modelMapper.map(e, CategoryResponseDto.class)));
		return categoryDtos;
	}

	@Override
	public CategoryResponseDto updateCategory(Long id, CategoryRequestDto dto) {
		Category category = categoryDao.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
		category.setCategoryName(dto.getCategoryName());
		Category updatedCategory = categoryDao.save(category);
		return modelMapper.map(updatedCategory, CategoryResponseDto.class);
	}

	@Override
	public void deleteCategory(Long id) {
		categoryDao.deleteById(id);
	}

}
