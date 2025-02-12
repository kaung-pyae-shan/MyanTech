package com.byteriders.myantech.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.byteriders.myantech.model.entity.User;

public interface UserRepo extends JpaRepository<User, Integer> {

}
