package com.ecommerce.admin_service.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "sales_forecasts")
public class SalesForecast {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate forecastDate;
    private String forecastType;
    private String category;
    private double predictedAmount;
    private double confidenceLevel;

    // Default constructor
    public SalesForecast() {
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getForecastDate() {
        return forecastDate;
    }

    public void setForecastDate(LocalDate forecastDate) {
        this.forecastDate = forecastDate;
    }

    public String getForecastType() {
        return forecastType;
    }

    public void setForecastType(String forecastType) {
        this.forecastType = forecastType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPredictedAmount() {
        return predictedAmount;
    }

    public void setPredictedAmount(double predictedAmount) {
        this.predictedAmount = predictedAmount;
    }

    public double getConfidenceLevel() {
        return confidenceLevel;
    }

    public void setConfidenceLevel(double confidenceLevel) {
        this.confidenceLevel = confidenceLevel;
    }
}