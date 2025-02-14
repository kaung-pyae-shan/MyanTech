package com.byteriders.myantech.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.input.ProductRequest;
import com.byteriders.myantech.model.dto.output.ProductDetails;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.service.ProductServices;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
	
	private final ProductServices productService;
	
	@PostMapping("/add")
	public ResponseEntity<Response> createProduct(@RequestBody ProductRequest productRequest) {
		return ResponseEntity.ok(productService.saveProduct(productRequest));
	}
	
	@PutMapping("/update/{product_id}")
	public ResponseEntity<Response> updateProduct(@PathVariable int product_id, @RequestBody @Valid ProductRequest productRequest) {
		return ResponseEntity.ok(productService.updateProduct(product_id, productRequest));
	}
	
	@GetMapping("/all")
    public List<ProductDetails> getAllProducts() {
        return productService.getAllProductDetails();
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<Response> getProductById(@PathVariable int id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
	
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteProduct(@PathVariable int id) {
        return ResponseEntity.ok(productService.deleteProduct(id));
    }
	
	@GetMapping("/search")
    public ResponseEntity<Response> searchProduct(@RequestParam String input) {
        return ResponseEntity.ok(productService.searchProduct(input));
    }

}
