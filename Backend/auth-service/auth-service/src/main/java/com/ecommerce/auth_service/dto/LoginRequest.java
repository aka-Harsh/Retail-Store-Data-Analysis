package com.ecommerce.auth_service.dto;

public class LoginRequest {
    private String username;
    private String password;

    // Default constructor
    public LoginRequest() {
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}