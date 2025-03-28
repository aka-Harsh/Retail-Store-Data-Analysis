package com.ecommerce.product_service.service;

import com.ecommerce.product_service.dto.ProductDTO;
import com.ecommerce.product_service.dto.NutritionInfoDTO;
import com.ecommerce.product_service.model.Product;
import com.ecommerce.product_service.repository.ProductRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::calculateDiscount)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategory(category).stream()
                .map(this::calculateDiscount)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProductDTO> getProductById(String id) {
        return productRepository.findById(id)
                .map(this::calculateDiscount)
                .map(this::convertToDTO);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        // Set expiration date (for example, 30 days from now)
        product.setExpirationDate(LocalDate.now().plusDays(30));
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public ProductDTO updateProduct(String id, ProductDTO productDTO) {
        if (productRepository.existsById(id)) {
            Product product = convertToEntity(productDTO);
            product.setId(id);
            Product updatedProduct = productRepository.save(product);
            return convertToDTO(updatedProduct);
        }
        return null; // Or throw exception
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    // Calculate discount based on expiration date
    private Product calculateDiscount(Product product) {
        if (product.getExpirationDate() != null) {
            LocalDate now = LocalDate.now();
            long daysUntilExpiration = ChronoUnit.DAYS.between(now, product.getExpirationDate());

            if (daysUntilExpiration <= 3) {
                product.setDiscountPrice(product.getPrice() * 0.75); // 25% off
                product.setDiscounted(true);
            } else if (daysUntilExpiration <= 7) {
                product.setDiscountPrice(product.getPrice() * 0.80); // 20% off
                product.setDiscounted(true);
            } else if (daysUntilExpiration <= 15) {
                product.setDiscountPrice(product.getPrice() * 0.90); // 10% off
                product.setDiscounted(true);
            }
        }
        return product;
    }

    // Convert Entity to DTO
    private ProductDTO convertToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();

        // Copy simple properties
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setDiscountPrice(product.getDiscountPrice());
        productDTO.setUnit(product.getUnit());
        productDTO.setDiscounted(product.isDiscounted());
        productDTO.setImageUrl(product.getImageUrl());
        productDTO.setCategory(product.getCategory());
        productDTO.setIngredients(product.getIngredients());
        productDTO.setShelfLife(product.getShelfLife());
        productDTO.setCountryOfOrigin(product.getCountryOfOrigin());
        productDTO.setSeller(product.getSeller());
        productDTO.setTags(product.getTags());

        // Handle the nutrition info explicitly
        if (product.getNutritionInfo() != null) {
            NutritionInfoDTO nutritionInfoDTO = new NutritionInfoDTO();
            nutritionInfoDTO.setCalories(product.getNutritionInfo().getCalories());
            nutritionInfoDTO.setCarbs(product.getNutritionInfo().getCarbs());
            nutritionInfoDTO.setProtein(product.getNutritionInfo().getProtein());
            nutritionInfoDTO.setFat(product.getNutritionInfo().getFat());
            nutritionInfoDTO.setFiber(product.getNutritionInfo().getFiber());
            nutritionInfoDTO.setVitamins(product.getNutritionInfo().getVitamins());
            productDTO.setNutritionInfo(nutritionInfoDTO);
        }

        return productDTO;
    }

    // Convert DTO to Entity
    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        return product;
    }
}