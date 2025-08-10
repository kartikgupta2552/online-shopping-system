package com.apnacart.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apnacart.entity.SubCategory;

@Repository
public interface SubCategoryDao extends JpaRepository<SubCategory, Long>{
    
    boolean existsBySubCategoryName(String subCategoryName);
    Optional<SubCategory> findBySubCategoryName(String subCategoryName);
    List<SubCategory> findByCategory_CategoryId(Long categoryId);


}
