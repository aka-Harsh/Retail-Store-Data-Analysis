package com.ecommerce.admin_service.repository;

import com.ecommerce.admin_service.model.SalesData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface SalesDataRepository extends JpaRepository<SalesData, Long> {
    List<SalesData> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<SalesData> findByCategory(String category);

    @Query("SELECT s.category, SUM(s.amount) FROM SalesData s WHERE s.date BETWEEN ?1 AND ?2 GROUP BY s.category")
    List<Object[]> getSalesByCategoryBetweenDates(LocalDate startDate, LocalDate endDate);

    @Query("SELECT s.productId, s.productName, SUM(s.amount) FROM SalesData s WHERE s.date BETWEEN ?1 AND ?2 GROUP BY s.productId, s.productName ORDER BY SUM(s.amount) DESC")
    List<Object[]> getTopProductsBetweenDates(LocalDate startDate, LocalDate endDate);
}