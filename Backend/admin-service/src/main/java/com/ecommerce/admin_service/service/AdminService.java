package com.ecommerce.admin_service.service;

import com.ecommerce.admin_service.dto.OrderDTO;
import com.ecommerce.admin_service.dto.OrderItemDTO;
import com.ecommerce.admin_service.dto.ProductDTO;
import com.ecommerce.admin_service.model.SalesData;
import com.ecommerce.admin_service.repository.SalesDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private SalesDataRepository salesDataRepository;

    @Value("${product.service.url}")
    private String productServiceUrl;

    @Value("${order.service.url}")
    private String orderServiceUrl;

    // Product-related operations
    public List<ProductDTO> getAllProducts() {
        ResponseEntity<List<ProductDTO>> response = restTemplate.exchange(
                productServiceUrl + "/api/products",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<ProductDTO>>() {}
        );
        return response.getBody();
    }

    public ProductDTO getProductById(String id) {
        return restTemplate.getForObject(
                productServiceUrl + "/api/products/" + id,
                ProductDTO.class
        );
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        return restTemplate.postForObject(
                productServiceUrl + "/api/products",
                productDTO,
                ProductDTO.class
        );
    }

    public void updateProduct(String id, ProductDTO productDTO) {
        restTemplate.put(
                productServiceUrl + "/api/products/" + id,
                productDTO
        );
    }

    public void deleteProduct(String id) {
        restTemplate.delete(productServiceUrl + "/api/products/" + id);
    }

    // Order-related operations
    public List<OrderDTO> getAllOrders() {
        ResponseEntity<List<OrderDTO>> response = restTemplate.exchange(
                orderServiceUrl + "/api/orders",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<OrderDTO>>() {}
        );
        return response.getBody();
    }

    public OrderDTO getOrderById(String id) {
        return restTemplate.getForObject(
                orderServiceUrl + "/api/orders/" + id,
                OrderDTO.class
        );
    }

    public void updateOrderStatus(String id, String status) {
        restTemplate.patchForObject(
                orderServiceUrl + "/api/orders/" + id + "/status?status=" + status,
                null,
                OrderDTO.class
        );
    }

    // Process orders to generate sales data
    public void processDailySalesData() {
        LocalDate yesterday = LocalDate.now().minusDays(1);

        // Fetch yesterday's orders
        ResponseEntity<List<OrderDTO>> response = restTemplate.exchange(
                orderServiceUrl + "/api/orders",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<OrderDTO>>() {}
        );

        List<OrderDTO> orders = response.getBody();

        if (orders != null) {
            for (OrderDTO order : orders) {
                // Check if the order was created yesterday
                LocalDate orderDate = order.getOrderDate().toLocalDate();
                if (orderDate.equals(yesterday)) {
                    // Process order items and save as sales data
                    for (OrderItemDTO item : order.getItems()) {
                        // Fetch product details to get category
                        ProductDTO product = getProductById(item.getProductId());

                        SalesData salesData = new SalesData();
                        salesData.setDate(orderDate);
                        salesData.setProductId(item.getProductId());
                        salesData.setProductName(item.getProductName());
                        salesData.setCategory(product.getCategory());
                        salesData.setQuantity(item.getQuantity());
                        salesData.setAmount(item.getTotalPrice());

                        salesDataRepository.save(salesData);
                    }
                }
            }
        }
    }
}