package com.ecommerce.product_service.dto;

import java.util.List;

public class ProductDTO {
    private String id;
    private String name;
    private String description;
    private double price;
    private double discountPrice;
    private String unit;
    private boolean isDiscounted;
    private String imageUrl;
    private String category;
    private NutritionInfoDTO nutritionInfo;
    private String ingredients;
    private String shelfLife;
    private String countryOfOrigin;
    private String seller;
    private List<String> tags;

    // Default constructor - required for serialization/deserialization
    public ProductDTO() {
    }

    // All getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(double discountPrice) {
        this.discountPrice = discountPrice;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public boolean isDiscounted() {
        return isDiscounted;
    }

    public void setDiscounted(boolean discounted) {
        isDiscounted = discounted;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public NutritionInfoDTO getNutritionInfo() {
        return nutritionInfo;
    }

    public void setNutritionInfo(NutritionInfoDTO nutritionInfo) {
        this.nutritionInfo = nutritionInfo;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getShelfLife() {
        return shelfLife;
    }

    public void setShelfLife(String shelfLife) {
        this.shelfLife = shelfLife;
    }

    public String getCountryOfOrigin() {
        return countryOfOrigin;
    }

    public void setCountryOfOrigin(String countryOfOrigin) {
        this.countryOfOrigin = countryOfOrigin;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}