package com.byteriders.myantech.model.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.input.ProductRequest;
import com.byteriders.myantech.model.dto.output.ProductDetails;
import com.byteriders.myantech.model.dto.output.ProductInfo;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.entity.Brand;
import com.byteriders.myantech.model.entity.Category;
import com.byteriders.myantech.model.entity.Product;
import com.byteriders.myantech.model.exception.NotFoundException;
import com.byteriders.myantech.model.repo.BrandRepo;
import com.byteriders.myantech.model.repo.CategoryRepo;
import com.byteriders.myantech.model.repo.ProductRepo;
import com.byteriders.myantech.model.repo.ProductRepository;
import com.byteriders.myantech.model.service.ProductServices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductServices {

	private final ProductRepository productRepository;
	private final ModelMapper modelMapper;
	private final CategoryRepo categoryRepo;
	private final BrandRepo brandRepo;
	private final ProductRepo productRepo;


	@Override
	public Response saveProduct(ProductRequest productRequest) {
		int brandId = productRequest.getBrand();
		int categoryId = productRequest.getType();
		
		Brand brand = brandRepo.findById(brandId)
				.orElseThrow(() -> new NotFoundException("Brand Not Found"));
		
		Category category = categoryRepo.findById(categoryId)				
				.orElseThrow(() -> new NotFoundException("Category Not Found"));
		
		if(productRepository.existsBySerialNumber(productRequest.getSerialNo())) {
			throw new IllegalArgumentException("Serial number already exists.");
		}
		
		
		Product product = Product.builder()
				.name(productRequest.getName())
				.category(category)
				.brand(brand)
				.price(productRequest.getPrice())
				.stock(productRequest.getStock())
				.cashback(productRequest.getCashback())
				.serialNumber(productRequest.getSerialNo())
				.stockFaulty(0)
				.createdDate(LocalDate.now())
				.build();
		
		productRepository.save(product);
		
		return Response.builder()
				.status(200)
				.message("Product Successfully Saved.")
				.build();
	}
	
	@Override
	public Response updateProduct(int id, ProductRequest productRequest) {
		
		Product existingProduct = productRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Product Not Found"));
		
		int brandId = productRequest.getBrand();
		int categoryId = productRequest.getType();
		
		Brand brand = brandRepo.findById(brandId)
				.orElseThrow(() -> new NotFoundException("Brand Not Found"));
		
		Category category = categoryRepo.findById(categoryId)				
				.orElseThrow(() -> new NotFoundException("Category Not Found"));
		
		Product product = Product.builder()
				.name(productRequest.getName())
				.category(category)
				.brand(brand)
				.price(productRequest.getPrice())
				.stock(productRequest.getStock())
				.cashback(productRequest.getCashback())
				.serialNumber(productRequest.getSerialNo())
				.stockFaulty(0)
				.createdDate(LocalDate.now())
				.build();
		
		productRepository.save(existingProduct);
		
		return Response.builder()
				.status(200)
				.message("Product Was Successfully Updated")
				.build();
	}
	
	@Override
	public Response getAllProducts() {

	    List<ProductInfo> products = productRepo.getAllProductInfo();

	    if (products.isEmpty()) {
	        throw new NotFoundException("Product Not Found");
	    }

	    return Response.builder()
	            .status(200)
	            .message("success")
	            .productInfos(products)
	            .build();
	}
	
	@Override
	public Response deleteProduct(int id) {

		productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product Not Found"));

		productRepository.deleteById(id);

		return Response.builder().status(200).message("Proudct Deleted successfully.").build();
	}
	
	@Override
	public Response getProductById(int id) {

	    ProductInfo products = productRepository.getProductInfoById(id);
	    
	    if (products == null) {
	        throw new NotFoundException("Product Not Found");
	    }

	    return Response.builder()
	            .status(200)
	            .message("success")
	            .productInfo(products)
	            .build();
	}
	
	@Override
	public Response searchProduct(String input) {
	    List<ProductInfo> products = productRepository.searchProducts(input);

	    if (products.isEmpty()) {
	        throw new NotFoundException("Product Not Found");
	    }

	    return Response.builder()
	        .status(200)
	        .message("success")
	        .productInfos(products)
	        .build();
	}

	@Override
	public List<ProductDetails> getAllProductDetails() {
		return productRepo.getAllProductDetails();
	}

	
}
