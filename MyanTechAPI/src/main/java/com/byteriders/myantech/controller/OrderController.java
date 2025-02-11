package com.byteriders.myantech.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.input.OrderForm;
import com.byteriders.myantech.model.dto.output.ShopProductDTO;
import com.byteriders.myantech.model.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	private OrderService service;

	@GetMapping("/form")
	public ResponseEntity<ShopProductDTO> getFormData() {
		return ResponseEntity.ok(service.getFormData());
	}
	
	@PostMapping("/create")
	public ResponseEntity<String> createOrder(@RequestBody OrderForm orderForm) {
		System.out.println(orderForm);
		var result = service.createOrder(orderForm);
		if(result) {
			return ResponseEntity.status(HttpStatus.CREATED).body("Order Created Successfully");
		}
		return ResponseEntity.badRequest().body("Order Creation failed");
	}
	
}
