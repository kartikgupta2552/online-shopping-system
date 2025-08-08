package com.apnacart.service.impl;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    private final String localImageFilePath = "uploads/images/";
    private final String dbImagePath = "/image/product/";

    private final ModelMapper modelMapper;

    @Override
    public ProductResponseDto createProduct(ProductRequestDto dto, MultipartFile imageFile) throws IOException  {

        SubCategory subCategory = subCategoryDao.findById(dto.getSubCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Subcategory not found with ID: " + dto.getSubCategoryId()));

        productDao.findByProductNameAndSubCategory_SubCategoryId(dto.getProductName(), dto.getSubCategoryId())
            .ifPresent(product -> {
                throw new ResourceAlreadyExistsException("Product already exist with name: " + dto.getProductName() 
                    + " under " + product.getSubCategory().getSubCategoryName() + " subcategory");
            });

        Product product = modelMapper.map(dto, Product.class);
        product.setSubCategory(subCategory);

        if(imageFile != null && !imageFile.isEmpty()){
            // saved image folder path
            String uploadDir = localImageFilePath;
            String originalFileName = imageFile.getOriginalFilename();
            // Generating new name for file so that there is no name conflict 
            String fileNewName = UUID.randomUUID().toString() + "_" + originalFileName;
            // combining file with folder (eg. uploads/images/abc.png)
            // it is cross-platform safe(Windows,Mac,Linux) bcz windows use ("\") and Linux/macOS use ("/") it will handle that
            Path filePath = Paths.get(uploadDir, fileNewName);

            // filePath.getParent() will return "uploads/images", here it will creates folder if not exists
            Files.createDirectories(filePath.getParent());
            // Add File at location and if already exists then replace it
            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            product.setImagePath(dbImagePath + fileNewName);
        }

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
    public ProductResponseDto updateProduct(Long productId, ProductRequestDto dto, MultipartFile imageFile) throws IOException{
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

        if(imageFile != null && !imageFile.isEmpty()){
            // delete existing image
            if(product.getImagePath() != null){
                // getting the image name of database and finding image in server by adding path of locally saved image
                Path oldImagePath = Paths.get(localImageFilePath, Paths.get(product.getImagePath()).getFileName().toString());
                Files.deleteIfExists(oldImagePath);
            }

            // save new image
            String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            Path newImagePath = Paths.get(localImageFilePath, fileName);
            Files.copy(imageFile.getInputStream(), newImagePath, StandardCopyOption.REPLACE_EXISTING);

            product.setImagePath(dbImagePath + fileName);
        }

        Product updatedProduct = productDao.save(product);
        ProductResponseDto responseDto = modelMapper.map(updatedProduct, ProductResponseDto.class);
        responseDto.setSubCategoryId(updatedProduct.getSubCategory().getSubCategoryId());

        return responseDto;
    }

    @Override
    public void deleteProduct(Long productId) throws IOException{
        
       Product product = productDao.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));

        if(product.getImagePath() != null){
                // getting the image name of database and finding image in server by adding path of locally saved image
                Path oldImagePath = Paths.get(localImageFilePath, Paths.get(product.getImagePath()).getFileName().toString());
                Files.deleteIfExists(oldImagePath);
        }

        productDao.deleteById(productId);
    }

    @Override
    public List<ProductResponseDto> getProductByCategoryId(Long categoryId) {
        List<Product> products = productDao.findBySubCategory_Category_CategoryId(categoryId);
        List<ProductResponseDto> responseDtos = new ArrayList<>();
        products.forEach(product -> {
            ProductResponseDto responseDto = modelMapper.map(product, ProductResponseDto.class);
            responseDto.setSubCategoryId(product.getSubCategory().getSubCategoryId());
            responseDtos.add(responseDto);
        });
        
        return responseDtos;

    }

}
