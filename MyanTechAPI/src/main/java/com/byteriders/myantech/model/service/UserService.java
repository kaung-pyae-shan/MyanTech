package com.byteriders.myantech.model.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.entity.User;
import com.byteriders.myantech.model.repo.UserRepo;


@Service
public class UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	public User validateUser(String username, String password) {
        Optional<User> user = userRepo.findByUsernameAndPassword(username,password);
        
        
        if (user.isPresent()) {
            User foundUser = user.get();
            if (foundUser.getPassword().equals(password)) {
                return foundUser; // Return user ID if credentials are correct
            }
        }
        
        return null; 
    }
}
