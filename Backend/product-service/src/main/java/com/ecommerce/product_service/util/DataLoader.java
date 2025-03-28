package com.ecommerce.product_service.util;

import com.ecommerce.product_service.model.NutritionInfo;
import com.ecommerce.product_service.model.Product;
import com.ecommerce.product_service.repository.ProductRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        // Load only if the database is empty
        if (productRepository.count() == 0) {
            loadProductData();
        }
    }

    private void loadProductData() {
        try {
            // Read JSON file from resources folder
            InputStream inputStream = TypeReference.class.getResourceAsStream("/products.json");
            JsonNode rootNode = objectMapper.readTree(inputStream);

            List<Product> allProducts = new ArrayList<>();

            // Process each category
            Iterator<String> fieldNames = rootNode.fieldNames();
            while (fieldNames.hasNext()) {
                String category = fieldNames.next();
                JsonNode categoryProducts = rootNode.get(category);

                for (JsonNode productNode : categoryProducts) {
                    Product product = new Product();

                    product.setId(productNode.get("id").asText());
                    product.setName(productNode.get("name").asText());
                    product.setDescription(productNode.get("description").asText());
                    product.setPrice(productNode.get("price").asDouble());

                    if (productNode.has("discountPrice")) {
                        product.setDiscountPrice(productNode.get("discountPrice").asDouble());
                        product.setDiscounted(true);
                    } else {
                        product.setDiscountPrice(product.getPrice());
                        product.setDiscounted(false);
                    }

                    product.setUnit(productNode.get("unit").asText());

                    if (productNode.has("isDiscounted")) {
                        product.setDiscounted(productNode.get("isDiscounted").asBoolean());
                    }

                    product.setImageUrl(productNode.get("imageUrl").asText());
                    product.setCategory(productNode.get("category").asText());

                    // Set nutrition info
                    JsonNode nutritionNode = productNode.get("nutritionInfo");
                    NutritionInfo nutritionInfo = new NutritionInfo();
                    nutritionInfo.setCalories(nutritionNode.get("calories").asText());
                    nutritionInfo.setCarbs(nutritionNode.get("carbs").asText());
                    nutritionInfo.setProtein(nutritionNode.get("protein").asText());
                    nutritionInfo.setFat(nutritionNode.get("fat").asText());
                    nutritionInfo.setFiber(nutritionNode.get("fiber").asText());
                    nutritionInfo.setVitamins(nutritionNode.get("vitamins").asText());

                    product.setNutritionInfo(nutritionInfo);

                    product.setIngredients(productNode.get("ingredients").asText());
                    product.setShelfLife(productNode.get("shelfLife").asText());
                    product.setCountryOfOrigin(productNode.get("countryOfOrigin").asText());
                    product.setSeller(productNode.get("seller").asText());

                    // Set tags
                    List<String> tags = new ArrayList<>();
                    JsonNode tagsNode = productNode.get("tags");
                    for (JsonNode tag : tagsNode) {
                        tags.add(tag.asText());
                    }
                    product.setTags(tags);

                    // Set a random expiration date (between 1 and 30 days from now)
                    Random random = new Random();
                    int daysToExpiration = random.nextInt(30) + 1;
                    product.setExpirationDate(LocalDate.now().plusDays(daysToExpiration));

                    allProducts.add(product);
                }
            }

            // Save all products to the database
            productRepository.saveAll(allProducts);
            System.out.println("Loaded " + allProducts.size() + " products from JSON file");

        } catch (IOException e) {
            System.err.println("Failed to load product data: " + e.getMessage());
            e.printStackTrace();
        }
    }
}