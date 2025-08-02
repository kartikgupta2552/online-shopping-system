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

import com.apnacart.dto.request.SubCategoryRequestDto;
import com.apnacart.dto.response.SubCategoryResponseDto;
import com.apnacart.payload.ApiResponse;
import com.apnacart.service.SubCategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/subcategory")
public class SubCategoryController {

	@Autowired
	private SubCategoryService subCategoryService;

	// Add SubCategory
	@PostMapping
	public ResponseEntity<ApiResponse<SubCategoryResponseDto>> addSubCategory(
			@RequestBody @Valid SubCategoryRequestDto subCategoryRequestDto) {
		SubCategoryResponseDto createdSubCategory = subCategoryService.createSubCategory(subCategoryRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success("Subcategory Added Successfully", createdSubCategory)); // 201 Created
	}

	// Get By Id
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<SubCategoryResponseDto>> getSubCategoryById(@PathVariable("id") Long id) {
		SubCategoryResponseDto subCategoryDto = subCategoryService.getSubCategoryById(id);
		return ResponseEntity.ok(ApiResponse.success("Subcategory fetched Successfully", subCategoryDto)); // 200 OK
	}

	// Get All SubCategories
	@GetMapping
	public ResponseEntity<ApiResponse<List<SubCategoryResponseDto>>> getAllSubCategories() {
		List<SubCategoryResponseDto> subCategories = subCategoryService.getAllSubCategories();
		return ResponseEntity.ok(ApiResponse.success("All subcategories fetched successfully", subCategories));
	}

	// Update SubCategory
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<SubCategoryResponseDto>> updateSubCategory(@PathVariable("id") Long id,
			@RequestBody @Valid SubCategoryRequestDto subCategoryDto) {
		SubCategoryResponseDto subCategoryResponseDto = subCategoryService.updateSubCategory(id, subCategoryDto);
		return ResponseEntity.ok(ApiResponse.success("Subcategory updated successfully", subCategoryResponseDto));
	}

	// Delete SubCategory
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteSubCategory(@PathVariable("id") Long id) {
		subCategoryService.deleteSubCategory(id);
		return ResponseEntity.ok(ApiResponse.success("Subcategory deleted successfully.", null));
	}

}
