package com.byteriders.myantech.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.output.TotalProductsByCategoryDto;
import com.byteriders.myantech.model.entity.ProductOrder;
import com.byteriders.myantech.model.repo.ProductRepo;

@Service
public class ProductService {

	@Autowired
	private ProductRepo repo;

	public void subtractProductQty(List<ProductOrder> productOrders) {	
		productOrders.forEach(po -> {
			var qty = po.getQty();
			var product = repo.findById(po.getProduct().getId()).orElseThrow();
			product.setStock(product.getStock()-qty);
			repo.save(product);
		});
	}
	
	public void addProductQty(List<ProductOrder> productOrders) {
		productOrders.forEach(po -> {
			var qty = po.getQty();
			var product = repo.findById(po.getProduct().getId()).orElseThrow();
			product.setStock(product.getStock()+qty);
			repo.save(product);
		});
	}
	
	public List<TotalProductsByCategoryDto> getProductsByCategory() {
		return repo.getTotalProductsByCategory();
	}
}
