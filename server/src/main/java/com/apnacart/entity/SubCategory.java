package com.apnacart.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class SubCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long subCategoryId;
	
	@Column(length = 50, nullable = false)
	private String subCategoryName;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	@JsonBackReference
	private Category category;
}
