package com.ecommerce.auth_service.util;

import com.ecommerce.auth_service.model.User;
import com.ecommerce.auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create admin user if it doesn't exist
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));

            Set<String> adminRoles = new HashSet<>();
            adminRoles.add("ROLE_ADMIN");
            admin.setRoles(adminRoles);

            userRepository.save(admin);
            System.out.println("Admin user created!");
        }

        // Create customer user if it doesn't exist
        if (!userRepository.existsByUsername("customer")) {
            User customer = new User();
            customer.setUsername("customer");
            customer.setEmail("customer@example.com");
            customer.setPassword(passwordEncoder.encode("customer123"));

            Set<String> customerRoles = new HashSet<>();
            customerRoles.add("ROLE_CUSTOMER");
            customer.setRoles(customerRoles);

            userRepository.save(customer);
            System.out.println("Customer user created!");
        }
    }
}