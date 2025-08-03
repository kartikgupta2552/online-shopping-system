package com.apnacart.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.apnacart.dao.CategoryDao;
import com.apnacart.dto.request.CategoryRequestDto;
import com.apnacart.dto.response.CategoryResponseDto;
import com.apnacart.entity.Category;
import com.apnacart.exception.ResourceAlreadyExistsException;
import com.apnacart.exception.ResourceNotFoundException;
import com.apnacart.service.CategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
	
	private final ModelMapper modelMapper;
	private final CategoryDao categoryDao;

	@Override
	public CategoryResponseDto createCategory(CategoryRequestDto dto) {

		if(categoryDao.existsByCategoryName(dto.getCategoryName())){
			throw new ResourceAlreadyExistsException("Category already exists with name: " + dto.getCategoryName());
		}
		
		Category category = modelMapper.map(dto, Category.class);
		Category createdCategory = categoryDao.save(category);
	
		return modelMapper.map(createdCategory, CategoryResponseDto.class);
	}

	@Override
	public CategoryResponseDto getCategoryById(Long id) {
		Category category = categoryDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));
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
		Category category = categoryDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));

		// Check if new name already exists in another category
		categoryDao.findByCategoryName(dto.getCategoryName()).ifPresent(existingCategory -> {
			if(!existingCategory.getCategoryId().equals(id)){
				throw new ResourceAlreadyExistsException("Category with name '"+dto.getCategoryName()+"' already exists.");
			}
		});

		category.setCategoryName(dto.getCategoryName());
		Category updatedCategory = categoryDao.save(category);
		return modelMapper.map(updatedCategory, CategoryResponseDto.class);
	}

	@Override
	public void deleteCategory(Long id) {
		if(!categoryDao.existsById(id)){
			throw new ResourceNotFoundException("Category not found with ID: " + id);
		}
		categoryDao.deleteById(id);
	}

}
