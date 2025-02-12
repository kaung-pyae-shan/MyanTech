package com.byteriders.myantech.model.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.output.ProductDTO;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.entity.Brand;
import com.byteriders.myantech.model.entity.Category;
import com.byteriders.myantech.model.entity.Product;
import com.byteriders.myantech.model.exception.NotFoundException;
import com.byteriders.myantech.model.repo.BrandRepo;
import com.byteriders.myantech.model.repo.CategoryRepo;
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
				.category(category).brand(brand).build();

		// save the product entity
		productRepository.save(productToSave);

		return Response.builder().status(200).message("Product successfully saved.").build();
	}

	@Override
	public Response updateProduct(ProductDTO productDTO) {
		// check if product exist
		Product existingProduct = productRepository.findById(productDTO.getProductId())
				.orElseThrow(() -> new NotFoundException("Product Not Found"));

		int productId = productRepository.findProductIdBySerialNumber(productDTO.getSerialNumber());

		if (productRepository.existsBySerialNumber(productDTO.getSerialNumber())
				&& productId != productDTO.getProductId()) {
			throw new IllegalArgumentException("Serial number already exists.");
		}

		// check if category is to be changed for the products
		if (productDTO.getCategoryId() > 0) {
			Category category = categoryRepository.findById(productDTO.getCategoryId())
					.orElseThrow(() -> new NotFoundException("Category Not Found"));
			existingProduct.setCategory(category);
		}

		// check if brand is to be changed for the products
		if (productDTO.getBrandId() > 0) {
			Brand brand = brandRepository.findById(productDTO.getBrandId())
					.orElseThrow(() -> new NotFoundException("Brand Not Found"));
			existingProduct.setBrand(brand);
		}

		// check if product fields is to be changed and update
		if (productDTO.getName() != null && !productDTO.getName().isBlank()) {
			existingProduct.setName(productDTO.getName());
		}

		if (productDTO.getPrice() != null && productDTO.getPrice().compareTo(BigDecimal.ZERO) >= 0) {
			existingProduct.setPrice(productDTO.getPrice());
		}

		if (productDTO.getCashback() != null && productDTO.getCashback().compareTo(BigDecimal.ZERO) >= 0) {
			existingProduct.setCashback(productDTO.getCashback());
		}

		if (productDTO.getSerialNumber() != null && !productDTO.getSerialNumber().isBlank()) {
			existingProduct.setSerialNumber(productDTO.getSerialNumber());
		}

		if (productDTO.getStock() != null && productDTO.getStock() >= 0) {
			existingProduct.setStock(productDTO.getStock());
		}

		existingProduct.setUpdatedDate(LocalDate.now());

		// update the product
		productRepository.save(existingProduct);

		// Build our response
		return Response.builder().status(200).message("Proudct Updated successfully.").build();
	}

	@Override
	public Response getAllProducts() {

		List<Product> productList = productRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));

		List<ProductDTO> productDTOList = modelMapper.map(productList, new TypeToken<List<ProductDTO>>() {
		}.getType());

		return Response.builder().status(200).message("success").products(productDTOList).build();
	}

	@Override
	public Response getProductById(int id) {

		Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product Not Found"));

		return Response.builder().status(200).message("success").product(modelMapper.map(product, ProductDTO.class))
				.build();
	}

	@Override
	public Response deleteProduct(int id) {

		productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product Not Found"));

		productRepository.deleteById(id);

		return Response.builder().status(200).message("Proudct Deleted successfully.").build();
	}

	@Override
	public Response searchProduct(String input) {

		List<Product> products = productRepository.searchProducts(input);

		if (products.isEmpty()) {
			throw new NotFoundException("Product Not Found");
		}

		List<ProductDTO> prdouctDTOList = modelMapper.map(products, new TypeToken<List<ProductDTO>>() {
		}.getType());

		return Response.builder().status(200).message("success").products(prdouctDTOList).build();
	}

}
