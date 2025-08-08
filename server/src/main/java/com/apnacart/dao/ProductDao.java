package com.apnacart.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apnacart.entity.Product;

@Repository
public interface ProductDao extends JpaRepository<Product,Long>{
    
    boolean existsByProductName(String productName);

    Optional<Product> findByProductNameAndSubCategory_SubCategoryId(String productName, Long subCategoryId);

    List<Product> findBySubCategory_Category_CategoryId(Long id);

}
