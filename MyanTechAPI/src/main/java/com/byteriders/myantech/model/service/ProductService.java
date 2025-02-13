package com.byteriders.myantech.model.service;

import com.byteriders.myantech.model.dto.output.ProductDTO;
import com.byteriders.myantech.model.dto.output.Response;


public interface ProductService {

	Response saveProduct(ProductDTO productDTO);

	Response updateProduct(ProductDTO productDTO);
	
	Response getAllProducts();
	
	Response getProductById(int id);
	
	Response deleteProduct(int id);
	
	Response searchProduct(String input);
	
}
