package com.byteriders.myantech.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.byteriders.myantech.model.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {

}
