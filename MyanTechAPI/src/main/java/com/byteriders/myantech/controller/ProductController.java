package com.byteriders.myantech.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.output.ProductDTO;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
	
	private final ProductService productService;
	
	@PostMapping("/add")
	public ResponseEntity<Response> saveProduct(
			@RequestParam("name")String name,
			@RequestParam("price")int price,
			@RequestParam(value = "cashback", required = false, defaultValue = "0")int cashback,
			@RequestParam("serialNumber")String serialNumber,
			@RequestParam("stock")Integer stock,
			@RequestParam(value = "stockFaulty", required = false, defaultValue = "0" )int stockFaulty,
			@RequestParam("categoryId")int categoryId,
			@RequestParam("brandId")int brandId
			){
		
		ProductDTO productDTO = new ProductDTO();
		productDTO.setName(name);
		productDTO.setPrice(price);
		productDTO.setCashback(cashback);
		productDTO.setSerialNumber(serialNumber);
		productDTO.setStock(stock);
		productDTO.setStockFaulty(stockFaulty);
		productDTO.setCategoryId(categoryId);
		productDTO.setBrandId(brandId);
		
		return ResponseEntity.ok(productService.saveProduct(productDTO));
		
	}
	
	@PutMapping("/update")
	public ResponseEntity<Response> updateProduct(
			@RequestParam(value = "name", required = false)String name,
			@RequestParam(value = "price", required = false)int price,
			@RequestParam(value = "cashback", required = false, defaultValue = "0")int cashback,
			@RequestParam(value = "serialNumber", required = false)String serialNumber,
			@RequestParam(value = "stock", required = false)Integer stock,
			@RequestParam(value = "stockFaulty", required = false, defaultValue = "0" )int stockFaulty,
			@RequestParam(value = "categoryId", required = false)int categoryId,
			@RequestParam(value = "brandId", required = false)int brandId,
			@RequestParam(value = "productId")int productId
			){
		
		ProductDTO productDTO = new ProductDTO();
		productDTO.setProductId(productId);
		productDTO.setName(name);
		productDTO.setPrice(price);
		productDTO.setCashback(cashback);
		productDTO.setSerialNumber(serialNumber);
		productDTO.setStock(stock);
		productDTO.setStockFaulty(stockFaulty);
		productDTO.setCategoryId(categoryId);
		productDTO.setBrandId(brandId);
		
		return ResponseEntity.ok(productService.updateProduct(productDTO));
		
	}
	
	@GetMapping("/all")
    public ResponseEntity<Response> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
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
