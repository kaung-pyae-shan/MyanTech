package com.byteriders.myantech.model.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.byteriders.myantech.model.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	boolean existsBySerialNumber(String serialNumber);
	
	@Query("SELECT p.id FROM Product p WHERE p.serialNumber = :serialNumber")
    int findProductIdBySerialNumber(@Param("serialNumber") String serialNumber);
	
	@Query("SELECT p FROM Product p " +
	        "JOIN FETCH p.category c " +
	        "JOIN FETCH p.brand b " +
	        "WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
	        "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
	        "OR LOWER(b.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
	List<Product> searchProducts(@Param("searchTerm") String searchTerm);



}