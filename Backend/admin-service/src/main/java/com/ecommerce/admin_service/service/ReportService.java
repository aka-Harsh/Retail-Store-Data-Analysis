package com.ecommerce.admin_service.service;

import com.ecommerce.admin_service.dto.SalesReportDTO;
import com.ecommerce.admin_service.model.SalesData;
import com.ecommerce.admin_service.repository.SalesDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private SalesDataRepository salesDataRepository;

    public SalesReportDTO generateSalesReport(LocalDate startDate, LocalDate endDate) {
        List<SalesData> salesData = salesDataRepository.findByDateBetween(startDate, endDate);

        SalesReportDTO report = new SalesReportDTO();
        report.setStartDate(startDate);
        report.setEndDate(endDate);

        double totalSales = salesData.stream()
                .mapToDouble(SalesData::getAmount)
                .sum();
        report.setTotalSales(totalSales);
        report.setTotalOrders(salesData.size());

        // Calculate sales by category
        Map<String, Double> salesByCategory = new HashMap<>();
        List<Object[]> categoryData = salesDataRepository.getSalesByCategoryBetweenDates(startDate, endDate);
        for (Object[] row : categoryData) {
            String category = (String) row[0];
            Double amount = (Double) row[1];
            salesByCategory.put(category, amount);
        }
        report.setSalesByCategory(salesByCategory);

        // Calculate sales by product
        Map<String, Double> salesByProduct = new HashMap<>();
        List<Object[]> productData = salesDataRepository.getTopProductsBetweenDates(startDate, endDate);
        for (Object[] row : productData) {
            String productName = (String) row[1];
            Double amount = (Double) row[2];
            salesByProduct.put(productName, amount);
        }
        report.setSalesByProduct(salesByProduct);

        return report;
    }
}