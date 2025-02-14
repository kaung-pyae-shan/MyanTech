package com.byteriders.myantech.model.service;

import java.util.List;

import com.byteriders.myantech.model.dto.input.ProductRequest;
import com.byteriders.myantech.model.dto.output.ProductDetails;
import com.byteriders.myantech.model.dto.output.Response;

public interface ProductServices {

Response saveProduct(ProductRequest productRequest);
	
	Response getAllProducts();
	
	List<ProductDetails> getAllProductDetails();
	
	Response getProductById(int id);
	
	Response deleteProduct(int id);
	
	Response searchProduct(String input);

	Response updateProduct(int id, ProductRequest productRequest);
}
