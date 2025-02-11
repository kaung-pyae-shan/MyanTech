package com.byteriders.myantech.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.input.SignInForm;
import com.byteriders.myantech.model.service.UserService;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
	@Autowired
	private UserService service;
	
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody SignInForm form) {
        String username = form.username();
        String password = form.password();

        int userId = service.validateUser(username, password);

        if (userId != 0) {
            return ResponseEntity.ok(Map.of("userId", userId));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    } 

}
