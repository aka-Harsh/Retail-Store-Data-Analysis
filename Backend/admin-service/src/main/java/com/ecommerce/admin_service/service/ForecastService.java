package com.ecommerce.admin_service.service;

import com.ecommerce.admin_service.dto.SalesForecastDTO;
import com.ecommerce.admin_service.model.SalesData;
import com.ecommerce.admin_service.model.SalesForecast;
import com.ecommerce.admin_service.repository.SalesDataRepository;
import com.ecommerce.admin_service.repository.SalesForecastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ForecastService {

    @Autowired
    private SalesDataRepository salesDataRepository;

    @Autowired
    private SalesForecastRepository forecastRepository;

    public SalesForecastDTO generateForecast(String forecastType) {
        LocalDate today = LocalDate.now();
        LocalDate forecastDate = today.plusDays(1); // Forecast for tomorrow

        // Retrieve historical data for the last 30 days
        LocalDate startDate = today.minusDays(30);
        List<SalesData> historicalData = salesDataRepository.findByDateBetween(startDate, today);

        // Group data by category
        Map<String, List<SalesData>> dataByCategory = historicalData.stream()
                .collect(Collectors.groupingBy(SalesData::getCategory));

        // Calculate forecast by category using simple moving average
        Map<String, Double> forecastByCategory = new HashMap<>();
        double predictedTotal = 0.0;

        for (Map.Entry<String, List<SalesData>> entry : dataByCategory.entrySet()) {
            String category = entry.getKey();
            List<SalesData> categoryData = entry.getValue();

            // Calculate average daily sales
            double totalCategorySales = categoryData.stream()
                    .mapToDouble(SalesData::getAmount)
                    .sum();
            double averageDailySales = totalCategorySales / 30.0;

            // Create forecast entry
            SalesForecast forecast = new SalesForecast();
            forecast.setForecastDate(forecastDate);
            forecast.setForecastType(forecastType);
            forecast.setCategory(category);
            forecast.setPredictedAmount(averageDailySales);
            forecast.setConfidenceLevel(0.8); // Simplified confidence level

            forecastRepository.save(forecast);

            forecastByCategory.put(category, averageDailySales);
            predictedTotal += averageDailySales;
        }

        // Create and return forecast DTO
        SalesForecastDTO forecastDTO = new SalesForecastDTO();
        forecastDTO.setForecastDate(forecastDate);
        forecastDTO.setForecastType(forecastType);
        forecastDTO.setForecastByCategory(forecastByCategory);
        forecastDTO.setPredictedTotal(predictedTotal);

        return forecastDTO;
    }
}