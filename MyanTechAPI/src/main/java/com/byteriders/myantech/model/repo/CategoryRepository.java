package com.byteriders.myantech.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.byteriders.myantech.model.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
