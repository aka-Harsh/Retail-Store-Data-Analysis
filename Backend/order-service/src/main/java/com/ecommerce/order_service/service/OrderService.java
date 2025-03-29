package com.ecommerce.order_service.service;

import com.ecommerce.order_service.dto.*;
import com.ecommerce.order_service.model.Order;
import com.ecommerce.order_service.model.OrderItem;
import com.ecommerce.order_service.repository.OrderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${product.service.url}")
    private String productServiceUrl;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<OrderDTO> getOrderById(String id) {
        return orderRepository.findById(id)
                .map(this::convertToDTO);
    }

    public List<OrderDTO> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmail(email).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public OrderDTO createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setCustomerName(orderRequest.getCustomerName());
        order.setCustomerEmail(orderRequest.getCustomerEmail());
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPhoneNumber(orderRequest.getPhoneNumber());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.PENDING);

        double totalAmount = 0.0;

        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            // Call Product Service to get the product details
            ProductDTO product = restTemplate.getForObject(
                    productServiceUrl + "/api/products/" + itemRequest.getProductId(),
                    ProductDTO.class
            );

            if (product != null) {
                OrderItem orderItem = new OrderItem();
                orderItem.setProductId(product.getId());
                orderItem.setProductName(product.getName());
                orderItem.setQuantity(itemRequest.getQuantity());

                // Use discounted price if available
                double unitPrice = product.isDiscounted() ? product.getDiscountPrice() : product.getPrice();
                orderItem.setUnitPrice(unitPrice);
                orderItem.setTotalPrice(unitPrice * itemRequest.getQuantity());

                // Set the relationship
                orderItem.setOrder(order);
                order.getItems().add(orderItem);

                totalAmount += orderItem.getTotalPrice();
            }
        }

        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }

    public OrderDTO updateOrderStatus(String id, Order.OrderStatus status) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setStatus(status);
            return convertToDTO(orderRepository.save(order));
        }
        return null; // Or throw exception
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }

    // Convert Entity to DTO
    private OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();

        // Copy simple properties
        orderDTO.setId(order.getId());
        orderDTO.setCustomerName(order.getCustomerName());
        orderDTO.setCustomerEmail(order.getCustomerEmail());
        orderDTO.setShippingAddress(order.getShippingAddress());
        orderDTO.setPhoneNumber(order.getPhoneNumber());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setTotalAmount(order.getTotalAmount());

        // Convert order items
        List<OrderItemDTO> orderItemDTOs = order.getItems().stream()
                .map(item -> {
                    OrderItemDTO itemDTO = new OrderItemDTO();
                    itemDTO.setId(item.getId());
                    itemDTO.setProductId(item.getProductId());
                    itemDTO.setProductName(item.getProductName());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setUnitPrice(item.getUnitPrice());
                    itemDTO.setTotalPrice(item.getTotalPrice());
                    return itemDTO;
                })
                .collect(Collectors.toList());

        orderDTO.setItems(orderItemDTOs);
        return orderDTO;
    }
}