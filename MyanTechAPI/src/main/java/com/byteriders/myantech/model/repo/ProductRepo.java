package com.byteriders.myantech.model.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.byteriders.myantech.model.dto.output.ShopProductDTO;
import com.byteriders.myantech.model.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {

	@Query("""
			SELECT new com.byteriders.myantech.model.dto.output.ShopProductDTO$ProductInfo(
		       p.id, p.model, b.name, p.price, p.stock, p.cashback, p.serialNumber)
		       FROM Product p
		       JOIN p.brand b
			""")
	public List<ShopProductDTO.ProductInfo> getAllProductInfo();
}
