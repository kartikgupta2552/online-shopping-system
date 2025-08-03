package com.apnacart.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apnacart.entity.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category, Long>{

    boolean existsByCategoryName(String categoryName);
    Optional<Category> findByCategoryName(String categoryName);

}
