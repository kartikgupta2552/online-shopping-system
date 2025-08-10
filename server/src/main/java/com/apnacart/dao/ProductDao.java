package com.apnacart.dao;

import com.apnacart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDao extends JpaRepository<Product, Long> {
    boolean existsByProductName(String productName);

    Optional<Product> findByProductNameAndSubCategory_SubCategoryId(String productName, Long subCategoryId);

    List<Product> findBySubCategory_SubCategoryId(Long subCategoryId);

    List<Product> findBySubCategory_Category_CategoryId(Long categoryId);

    // searching product on name and description
    List<Product> findByProductNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String desc);

    List<Product> findByProductNameContainingIgnoreCase(String keyword);

}//ProductDao ends

