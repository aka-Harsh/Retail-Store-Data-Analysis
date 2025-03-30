package com.ecommerce.admin_service.repository;

import com.ecommerce.admin_service.model.SalesForecast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface SalesForecastRepository extends JpaRepository<SalesForecast, Long> {
    List<SalesForecast> findByForecastDateAndForecastType(LocalDate date, String type);
}