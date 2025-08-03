package com.apnacart.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.apnacart.dao.CategoryDao;
import com.apnacart.dao.SubCategoryDao;
import com.apnacart.dto.request.SubCategoryRequestDto;
import com.apnacart.dto.response.SubCategoryResponseDto;
import com.apnacart.entity.Category;
import com.apnacart.entity.SubCategory;
import com.apnacart.exception.ResourceAlreadyExistsException;
import com.apnacart.exception.ResourceNotFoundException;
import com.apnacart.service.SubCategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubCategoryServiceImpl implements SubCategoryService {

	private final ModelMapper modelMapper;
	private final CategoryDao categoryDao;
	private final SubCategoryDao subCategoryDao;

	@Override
	public SubCategoryResponseDto createSubCategory(SubCategoryRequestDto subCategoryDto) {
		
		Category category = categoryDao.findById(subCategoryDto.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + subCategoryDto.getCategoryId()));

		if(subCategoryDao.existsBySubCategoryName(subCategoryDto.getSubCategoryName())){
			throw new ResourceAlreadyExistsException("Subcategory already exist with name: "+ subCategoryDto.getSubCategoryName());
		}

		SubCategory subCategory = modelMapper.map(subCategoryDto, SubCategory.class);
		subCategory.setCategory(category);
		SubCategory createdSubCategory = subCategoryDao.save(subCategory);
		SubCategoryResponseDto subCategoryResponseDto = modelMapper.map(createdSubCategory, SubCategoryResponseDto.class);
		subCategoryResponseDto.setCategoryId(createdSubCategory.getCategory().getCategoryId());
		
		return subCategoryResponseDto;
	}

	@Override
	public SubCategoryResponseDto getSubCategoryById(Long id) {
		
		SubCategory subCategory = subCategoryDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Subcategory not found with ID: " + id)); 
		SubCategoryResponseDto subCategoryResponseDto = modelMapper.map(subCategory, SubCategoryResponseDto.class);
		subCategoryResponseDto.setCategoryId(subCategory.getCategory().getCategoryId());
		
		return subCategoryResponseDto;
	}

	@Override
	public List<SubCategoryResponseDto> getAllSubCategories() {
		
		List<SubCategory> subCategories = subCategoryDao.findAll();
		List<SubCategoryResponseDto> subCategoryDto = new ArrayList<>();
		subCategories.forEach((e)->{
			SubCategoryResponseDto subCategoryResponseDto = modelMapper.map(e, SubCategoryResponseDto.class);
			subCategoryResponseDto.setCategoryId(e.getCategory().getCategoryId());
			subCategoryDto.add(subCategoryResponseDto);
		});
		
		return subCategoryDto;
	}

	@Override
	public SubCategoryResponseDto updateSubCategory(Long id, SubCategoryRequestDto subCategoryDto) {
		
		Category category = categoryDao.findById(subCategoryDto.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + subCategoryDto.getCategoryId()));
		SubCategory subCategory = subCategoryDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Subcategory not found with ID: " + id));
		
		subCategoryDao.findBySubCategoryName(subCategoryDto.getSubCategoryName()).ifPresent(existingSubCategory -> {
			if(!existingSubCategory.getSubCategoryId().equals(id)){
				throw new ResourceAlreadyExistsException("Subcategory with name '"+subCategoryDto.getSubCategoryName()+"' already exists.");
			}
		});

		subCategory.setSubCategoryName(subCategoryDto.getSubCategoryName());
		subCategory.setCategory(category);
		SubCategory updatedSubCategory = subCategoryDao.save(subCategory);
		SubCategoryResponseDto subCategoryResponseDto = modelMapper.map(updatedSubCategory, SubCategoryResponseDto.class);
		subCategoryResponseDto.setCategoryId(updatedSubCategory.getCategory().getCategoryId());
		
		return subCategoryResponseDto;
	}

	@Override
	public void deleteSubCategory(Long id) {
		if(!subCategoryDao.existsById(id)){
			throw new ResourceNotFoundException("Subcategory not found with ID: " + id);
		}
		subCategoryDao.deleteById(id);
	}

}
