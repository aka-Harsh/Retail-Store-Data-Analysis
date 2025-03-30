package com.ecommerce.admin_service.dto;

import java.time.LocalDate;
import java.util.Map;

public class SalesReportDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private double totalSales;
    private int totalOrders;
    private Map<String, Double> salesByCategory;
    private Map<String, Double> salesByProduct;

    // Default constructor
    public SalesReportDTO() {
    }

    // Getters and setters
    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Map<String, Double> getSalesByCategory() {
        return salesByCategory;
    }

    public void setSalesByCategory(Map<String, Double> salesByCategory) {
        this.salesByCategory = salesByCategory;
    }

    public Map<String, Double> getSalesByProduct() {
        return salesByProduct;
    }

    public void setSalesByProduct(Map<String, Double> salesByProduct) {
        this.salesByProduct = salesByProduct;
    }
}