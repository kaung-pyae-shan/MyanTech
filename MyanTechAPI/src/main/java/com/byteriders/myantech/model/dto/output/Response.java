package com.byteriders.myantech.model.dto.output;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

	// Generic
	private int status;
	private String message;
	
	// For pagination
	private Integer totalPages;
	private Long totalElements;
	
	// Data Output optional
	private ProductDTO product;
	private List<ProductDTO> products;
	
	private BrandDTO brand;
	private List<BrandDTO> brands;
	
	private final LocalDateTime timestamp = LocalDateTime.now();
	
}
