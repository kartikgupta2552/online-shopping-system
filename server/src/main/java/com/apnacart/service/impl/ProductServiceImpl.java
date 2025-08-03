package com.apnacart.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.apnacart.dao.ProductDao;
import com.apnacart.dao.SubCategoryDao;
import com.apnacart.dto.request.ProductRequestDto;
import com.apnacart.dto.response.ProductResponseDto;
import com.apnacart.entity.Product;
import com.apnacart.entity.SubCategory;
import com.apnacart.exception.ResourceAlreadyExistsException;
import com.apnacart.exception.ResourceNotFoundException;
import com.apnacart.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductDao productDao;
    private final SubCategoryDao subCategoryDao;

    private final ModelMapper modelMapper;

    @Override
    public ProductResponseDto createProduct(ProductRequestDto dto) {

        SubCategory subCategory = subCategoryDao.findById(dto.getSubCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Subcategory not found with ID: " + dto.getSubCategoryId()));
        // if(productDao.existsByProductName(dto.getProductName())){
        //     throw new ResourceAlreadyExistsException("Product already exist with name: " + dto.getProductName());
        // }

        productDao.findByProductNameAndSubCategory_SubCategoryId(dto.getProductName(), dto.getSubCategoryId())
            .ifPresent(product -> {
                throw new ResourceAlreadyExistsException("Product already exist with name: " + dto.getProductName() 
                    + "under " + product.getSubCategory().getSubCategoryName() + " subcategory");
            });

        Product product = modelMapper.map(dto, Product.class);
        product.setSubCategory(subCategory);
        Product createProduct = productDao.save(product);
        ProductResponseDto responseDto = modelMapper.map(createProduct, ProductResponseDto.class);
        responseDto.setSubCategoryId(createProduct.getSubCategory().getSubCategoryId());
        
        return responseDto;
    }

    @Override
    public ProductResponseDto getProductById(Long productId) {
        
        Product product = productDao.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
        ProductResponseDto responseDto = modelMapper.map(product, ProductResponseDto.class);
        responseDto.setSubCategoryId(product.getSubCategory().getSubCategoryId());

        return responseDto;
    }

    @Override
    public List<ProductResponseDto> getAllProducts() {
        
        List<Product> products = productDao.findAll();
        List<ProductResponseDto> responseDtoList = new ArrayList<>();
        products.forEach(product -> {
            ProductResponseDto responseDto = modelMapper.map(product, ProductResponseDto.class);
            responseDto.setSubCategoryId(product.getSubCategory().getSubCategoryId());
            responseDtoList.add(responseDto);
        });

        return responseDtoList;
    }

    @Override
    public ProductResponseDto updateProduct(Long productId, ProductRequestDto dto) {
        // Check if product exists
        Product product = productDao.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
        //Check if subcategory exists
        SubCategory subCategory = subCategoryDao.findById(dto.getSubCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Subcategory not found with ID: " + dto.getSubCategoryId()));

        // Check for duplicate productName with same subCategory (except current product)
        Optional<Product> existingProduct = productDao.findByProductNameAndSubCategory_SubCategoryId(dto.getProductName(), dto.getSubCategoryId());
        if(existingProduct.isPresent() && !existingProduct.get().getProductId().equals(productId)){
            throw new ResourceAlreadyExistsException("Product already exists with the same name under this SubCategory.");
        }
        
        // Update product details
        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setSubCategory(subCategory);

        Product updatedProduct = productDao.save(product);
        ProductResponseDto responseDto = modelMapper.map(updatedProduct, ProductResponseDto.class);
        responseDto.setSubCategoryId(updatedProduct.getSubCategory().getSubCategoryId());

        return responseDto;
    }

    @Override
    public void deleteProduct(Long productId) {
        
        if(!productDao.existsById(productId)){
            throw new ResourceNotFoundException("Product not found with ID: " + productId);
        }

        productDao.deleteById(productId);
    }

}
