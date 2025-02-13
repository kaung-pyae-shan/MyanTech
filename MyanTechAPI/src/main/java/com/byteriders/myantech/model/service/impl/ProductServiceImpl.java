package com.byteriders.myantech.model.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.output.ProductDTO;
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
import com.byteriders.myantech.model.service.ProductService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private final ModelMapper modelMapper;
	private final CategoryRepo categoryRepository;
	private final BrandRepo brandRepository;
	private final ProductRepo productRepo;

	@Override
	public Response saveProduct(ProductDTO productDTO) {

		Category category = categoryRepository.findById(productDTO.getCategoryId())
				.orElseThrow(() -> new NotFoundException("Category Not Found"));

		Brand brand = brandRepository.findById(productDTO.getBrandId())
				.orElseThrow(() -> new NotFoundException("Category Not Found"));

		if (productRepository.existsBySerialNumber(productDTO.getSerialNumber())) {
			throw new IllegalArgumentException("Serial number already exists.");
		}

		// map our dto to product entity
		Product productToSave = Product.builder()
				.name(productDTO.getName())
				.price(productDTO.getPrice())
				.cashback(productDTO.getCashback())
				.serialNumber(productDTO.getSerialNumber())
				.stock(productDTO.getStock())
				.stockFaulty(productDTO.getStockFaulty())
				.category(category)
				.createdDate(LocalDate.now())
				.brand(brand).build();

		// save the product entity
		productRepository.save(productToSave);

		return Response.builder().status(200).message("Product successfully saved.").build();
	}

	@Override
	public Response updateProduct(ProductDTO productDTO) {
		// check if product exist
		Product existingProduct = productRepository.findById(productDTO.getProductId())
				.orElseThrow(() -> new NotFoundException("Product Not Found"));

		Category category = categoryRepository.findById(productDTO.getCategoryId())
				.orElseThrow(() -> new NotFoundException("Category Not Found"));
		
		Brand brand = brandRepository.findById(productDTO.getBrandId())
				.orElseThrow(() -> new NotFoundException("Brand Not Found"));
		
		existingProduct.setCategory(category);
		existingProduct.setBrand(brand);
		existingProduct.setName(productDTO.getName());
		existingProduct.setPrice(productDTO.getPrice());
		existingProduct.setCashback(productDTO.getCashback());
		existingProduct.setSerialNumber(productDTO.getSerialNumber());
		existingProduct.setStock(productDTO.getStock());
		existingProduct.setStockFaulty(productDTO.getStockFaulty());
		existingProduct.setUpdatedDate(LocalDate.now());

		// update the product
		productRepository.save(existingProduct);

		// Build our response
		return Response.builder().status(200).message("Proudct Updated successfully.").build();
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

	

//	@Override
//	public Response getProductById(int id) {
//
//		Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product Not Found"));
//
//		return Response.builder().status(200).message("success").product(modelMapper.map(product, ProductDTO.class))
//				.build();
//	}

	

//	@Override
//	public Response searchProduct(String input) {
//
//		List<Product> products = productRepository.searchProducts(input);
//
//		if (products.isEmpty()) {
//			throw new NotFoundException("Product Not Found");
//		}
//
//		List<ProductDTO> prdouctDTOList = modelMapper.map(products, new TypeToken<List<ProductDTO>>() {
//		}.getType());
//
//		return Response.builder().status(200).message("success").products(prdouctDTOList).build();
//	}

}
