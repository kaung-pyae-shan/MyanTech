package com.byteriders.myantech.model.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.byteriders.myantech.model.dto.output.ProductDetails;
import com.byteriders.myantech.model.dto.output.ProductInfo;
import com.byteriders.myantech.model.dto.output.TotalProductsByCategoryDto;
import com.byteriders.myantech.model.entity.Product;

import jakarta.transaction.Transactional;

public interface ProductRepo extends JpaRepository<Product, Integer> {

	@Query("""
	        SELECT new com.byteriders.myantech.model.dto.output.ProductInfo(
	            p.id, p.name, b.name, c.name, p.price, p.stock, p.cashback, p.serialNumber)
	        FROM Product p
	        JOIN p.brand b
	        JOIN p.category c
	        ORDER BY p.id DESC
	    """)
	public List<ProductInfo> getAllProductInfo();
	
	@Query("""
	        SELECT new com.byteriders.myantech.model.dto.output.ProductDetails(
	            p.id, p.name, b.id, c.id, b.name, c.name, p.price, p.stock, p.cashback, p.serialNumber)
	        FROM Product p
	        JOIN p.brand b
	        JOIN p.category c
	        ORDER BY p.id DESC
	    """)
	public List<ProductDetails> getAllProductDetails();


	@Query("Select p.stock from Product p where id = :id")
	public int findStockById(int id);
	
	@Modifying
	@Transactional
	@Query("UPDATE Product p SET p.stock=:stock where p.id=:id")
	public int updateStock(int stock, int id);

	
	 @Query("SELECT new com.byteriders.myantech.model.dto.output.TotalProductsByCategoryDto(c.id, c.name, COUNT(p.id)) " +
	           "FROM Product p " +
	           "JOIN p.category c " + 
	           "GROUP BY c.id, c.name")
	    List<TotalProductsByCategoryDto> getTotalProductsByCategory();

}
