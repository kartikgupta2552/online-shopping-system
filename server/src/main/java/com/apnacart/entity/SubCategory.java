package com.apnacart.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

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
	@JoinColumn(name = "category_id", nullable = false) //nullable - false because a subcategory shouldn't exist without a category
	@JsonBackReference
	private Category category;

	@OneToMany(mappedBy = "subCategory", cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Product> products;

}
