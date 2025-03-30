package com.ecommerce.admin_service.dto;

import java.time.LocalDate;
import java.util.Map;

public class SalesForecastDTO {
    private LocalDate forecastDate;
    private String forecastType;
    private Map<String, Double> forecastByCategory;
    private double predictedTotal;

    // Default constructor
    public SalesForecastDTO() {
    }

    // Getters and setters
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

    public Map<String, Double> getForecastByCategory() {
        return forecastByCategory;
    }

    public void setForecastByCategory(Map<String, Double> forecastByCategory) {
        this.forecastByCategory = forecastByCategory;
    }

    public double getPredictedTotal() {
        return predictedTotal;
    }

    public void setPredictedTotal(double predictedTotal) {
        this.predictedTotal = predictedTotal;
    }
}