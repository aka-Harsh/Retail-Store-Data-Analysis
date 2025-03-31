package com.ecommerce.auth_service.controller;

import com.ecommerce.auth_service.dto.JwtResponse;
import com.ecommerce.auth_service.dto.LoginRequest;
import com.ecommerce.auth_service.dto.SignupRequest;
import com.ecommerce.auth_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        if (jwtResponse == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid username or password");
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        boolean success = authService.registerUser(signUpRequest);
        if (!success) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Username or email is already taken!");
            return ResponseEntity.badRequest().body(response);
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }
}