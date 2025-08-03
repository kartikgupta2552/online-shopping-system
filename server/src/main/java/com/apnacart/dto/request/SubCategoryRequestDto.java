package com.apnacart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubCategoryRequestDto {
	
	@NotBlank(message = "Subcategory name is required")
	private String subCategoryName;
	
	@NotNull(message = "Category ID is required")
	private Long categoryId;
	
}
