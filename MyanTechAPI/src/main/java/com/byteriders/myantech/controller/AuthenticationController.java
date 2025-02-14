package com.byteriders.myantech.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.input.SignInForm;
import com.byteriders.myantech.model.dto.output.UserDetails;
import com.byteriders.myantech.model.entity.User;
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

        User user = service.validateUser(username, password);

        if (user != null) {
        	UserDetails userDetails = new UserDetails();
        	userDetails.setId(user.getId());
        	userDetails.setName(user.getUsername());
        	userDetails.setRole(user.getRole());
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    } 
	
	@PostMapping("/logout")
	public ResponseEntity<String> logout() {
	    return ResponseEntity.ok("Logged out successfully");
	}

}
