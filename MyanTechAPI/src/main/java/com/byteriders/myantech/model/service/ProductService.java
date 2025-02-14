package com.byteriders.myantech.model.service;

import java.util.List;

import com.byteriders.myantech.model.dto.input.ProductRequest;
import com.byteriders.myantech.model.dto.output.ProductDetails;
import com.byteriders.myantech.model.dto.output.Response;


public interface ProductService {

	Response saveProduct(ProductRequest productRequest);
	
	Response getAllProducts();
	
	List<ProductDetails> getAllProductDetails();
	
	Response getProductById(int id);
	
	Response deleteProduct(int id);
	
	Response searchProduct(String input);

	Response updateProduct(int id, ProductRequest productRequest);

	
	

//	@Autowired
//	private ProductRepo repo;
//
//	public void subtractProductQty(List<ProductOrder> productOrders) {
////		productOrders.forEach(po -> {
////			var qty = po.getQty();
////			var dbQty = repo.findStockById(po.getProduct().getId());
////			repo.updateStock(dbQty - qty);
////		});
//		for (ProductOrder productOrder : productOrders) {
//			var stock = productOrder.getQty();
//			var dbStock = repo.findStockById(productOrder.getProduct().getId());
//			repo.updateStock(dbStock - stock, productOrder.getProduct().getId());
//		}
//	}
//	
//	public void addProductQty(List<ProductOrder> productOrders) {
//		productOrders.forEach(po -> {
//			var qty = po.getQty();
//			var dbQty = repo.findStockById(po.getProduct().getId());
//			repo.updateStock(dbQty + qty, po.getProduct().getId());
//		});
//	}
}
