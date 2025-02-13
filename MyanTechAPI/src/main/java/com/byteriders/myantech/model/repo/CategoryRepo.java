package com.byteriders.myantech.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.byteriders.myantech.model.entity.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
    // No need for getAllCategory() since JpaRepository provides findAll() by default
}
