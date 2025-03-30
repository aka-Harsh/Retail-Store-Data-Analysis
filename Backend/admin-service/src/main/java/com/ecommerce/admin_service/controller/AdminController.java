package com.ecommerce.admin_service.controller;

import com.ecommerce.admin_service.dto.OrderDTO;
import com.ecommerce.admin_service.dto.ProductDTO;
import com.ecommerce.admin_service.dto.SalesForecastDTO;
import com.ecommerce.admin_service.dto.SalesReportDTO;
import com.ecommerce.admin_service.service.AdminService;
import com.ecommerce.admin_service.service.ForecastService;
import com.ecommerce.admin_service.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")  // For development; restrict in production
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private ForecastService forecastService;

    // Product management
    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(adminService.getAllProducts());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id) {
        ProductDTO product = adminService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        return new ResponseEntity<>(adminService.createProduct(productDTO), HttpStatus.CREATED);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Void> updateProduct(@PathVariable String id, @RequestBody ProductDTO productDTO) {
        adminService.updateProduct(id, productDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        adminService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // Order management
    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(adminService.getAllOrders());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable String id) {
        OrderDTO order = adminService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<Void> updateOrderStatus(
            @PathVariable String id,
            @RequestParam String status) {
        adminService.updateOrderStatus(id, status);
        return ResponseEntity.ok().build();
    }

    // Sales reports
    @GetMapping("/reports/sales")
    public ResponseEntity<SalesReportDTO> getSalesReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(reportService.generateSalesReport(startDate, endDate));
    }

    // Sales forecasting
    @GetMapping("/forecasts/sales")
    public ResponseEntity<SalesForecastDTO> getSalesForecast(
            @RequestParam String forecastType) {
        return ResponseEntity.ok(forecastService.generateForecast(forecastType));
    }

    // Manually process sales data (could be scheduled with Spring @Scheduled)
    @PostMapping("/data/process-sales")
    public ResponseEntity<Void> processSalesData() {
        adminService.processDailySalesData();
        return ResponseEntity.ok().build();
    }
}