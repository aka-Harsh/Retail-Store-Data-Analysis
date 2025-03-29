package com.ecommerce.order_service.dto;

public class OrderItemRequest {
    private String productId;
    private int quantity;

    // Default constructor
    public OrderItemRequest() {
    }

    // Getters and setters
    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}