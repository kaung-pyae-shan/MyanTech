package com.byteriders.myantech.model.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.byteriders.myantech.model.dto.output.ProductInfo;
import com.byteriders.myantech.model.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	boolean existsBySerialNumber(String serialNumber);
	
	@Query("SELECT COALESCE(p.id, 0) FROM Product p WHERE p.serialNumber = :serialNumber")
	int findProductIdBySerialNumber(@Param("serialNumber") String serialNumber);
	
	@Query("""
	        SELECT new com.byteriders.myantech.model.dto.output.ProductInfo(
	            p.id, p.name, b.name, c.name, p.price, p.stock, p.cashback, p.serialNumber)
	        FROM Product p
	        JOIN p.brand b
	        JOIN p.category c
	        WHERE p.id = :id
	    """)
	public ProductInfo getProductInfoById(int id);
	
	
		@Query("SELECT new com.byteriders.myantech.model.dto.output.ProductInfo(p.id, p.name, b.name, c.name, p.price, p.stock, p.cashback, p.serialNumber) " +
		       "FROM Product p " +
		       "JOIN p.category c " +
		       "JOIN p.brand b " +
		       "WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
		       "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
		       "OR LOWER(b.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
		List<ProductInfo> searchProducts(@Param("searchTerm") String searchTerm);



	
//	@Query("SELECT p FROM Product p " +
//	        "JOIN FETCH p.category c " +
//	        "JOIN FETCH p.brand b " +
//	        "WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
//	        "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
//	        "OR LOWER(b.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
//	List<Product> searchProducts(@Param("searchTerm") String searchTerm);
	
	
	





}