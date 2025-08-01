package com.apnacart.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequestDto {

	@NotBlank(message = "Category name is required")
	private String categoryName;
	
}
