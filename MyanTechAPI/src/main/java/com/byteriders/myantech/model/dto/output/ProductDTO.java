package com.byteriders.myantech.model.dto.output;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDTO {
	
	private int id;
	private String name;
	private BigDecimal price;
	private BigDecimal cashBack;
	private String serialNumber;
	private Integer stockQuantiy;
	
	private int categoryId;
	private int productId;
	private int brandId;
	
	private int createId;
	private final LocalDateTime createAt = LocalDateTime.now();
	
	private int updateId;
	private LocalDateTime updatedAt;

}
