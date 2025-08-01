package com.apnacart.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apnacart.entity.SubCategory;

@Repository
public interface SubCategoryDao extends JpaRepository<SubCategory, Long>{

}
