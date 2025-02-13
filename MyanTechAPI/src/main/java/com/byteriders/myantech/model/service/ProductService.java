package com.byteriders.myantech.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.entity.ProductOrder;
import com.byteriders.myantech.model.repo.ProductRepo;

@Service
public class ProductService {

	@Autowired
	private ProductRepo repo;

	public void subtractProductQty(List<ProductOrder> productOrders) {
//		productOrders.forEach(po -> {
//			var qty = po.getQty();
//			var dbQty = repo.findStockById(po.getProduct().getId());
//			repo.updateStock(dbQty - qty);
//		});
		for (ProductOrder productOrder : productOrders) {
			var stock = productOrder.getQty();
			var dbStock = repo.findStockById(productOrder.getProduct().getId());
			repo.updateStock(dbStock - stock, productOrder.getProduct().getId());
		}
	}
	
	public void addProductQty(List<ProductOrder> productOrders) {
		productOrders.forEach(po -> {
			var qty = po.getQty();
			var dbQty = repo.findStockById(po.getProduct().getId());
			repo.updateStock(dbQty + qty, po.getProduct().getId());
		});
	}
}
