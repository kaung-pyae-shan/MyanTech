package com.byteriders.myantech.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.input.OrderForm;
import com.byteriders.myantech.model.dto.input.OrderSearch;
import com.byteriders.myantech.model.dto.input.OrderStatusUpdateDTO;
import com.byteriders.myantech.model.dto.input.ProductOrderStatusUpdateDTO;
import com.byteriders.myantech.model.dto.output.OrderDetails;
import com.byteriders.myantech.model.dto.output.ProductInfo;
import com.byteriders.myantech.model.dto.output.ShopInfo;
import com.byteriders.myantech.model.repo.OrderRepo;
import com.byteriders.myantech.model.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	private OrderService service;
	@Autowired
	private OrderRepo repo;
	
	@GetMapping("/form/shops")
	public List<ShopInfo> getShopFormData() {
		return service.getShopFormData();
	}
	
	@GetMapping("/form/products")
	public List<ProductInfo> getProductFormData() {
		return service.getProductFormData();
	}
	
	@GetMapping("/list")
	public List<OrderDetails> getAllOrders(OrderSearch search) {
		return service.getAllOrderDetails(search);
	}
	
	@PutMapping("/status")
	public ResponseEntity<String> updateOrderStatus(@RequestBody OrderStatusUpdateDTO statusUpdate) {
		var result = service.updateOrderStatus(statusUpdate);
		return result ? ResponseEntity.ok("Order Status updated successfully") : ResponseEntity.badRequest().body("Unexpected value" + statusUpdate.status().name());
	}
	
	@PutMapping("/product/status")
	public ResponseEntity<String> updateProductOrderStatus(@RequestBody ProductOrderStatusUpdateDTO statusUpdate) {
		var result = service.updateProductOrderStatus(statusUpdate);
		return result ? ResponseEntity.ok("ProductOrder Status updated successfully") : ResponseEntity.badRequest().body("Unexpected value" + statusUpdate.status().name());
	} 
	
	@PostMapping("/create")
	public ResponseEntity<String> createOrder(@RequestBody OrderForm orderForm) {
		var result = service.createOrder(orderForm);
		if(result) {
			return ResponseEntity.status(HttpStatus.CREATED).body("Order Created Successfully");
		}
		return ResponseEntity.badRequest().body("Order Creation failed");
	}
	
}
