package com.byteriders.myantech.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.output.TotalProductsByCategoryDto;
import com.byteriders.myantech.model.repo.ProductRepo;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepo productRepo;

	public List<TotalProductsByCategoryDto> getProductsByCategory() {
		return productRepo.getTotalProductsByCategory();
	}
	
	

}
