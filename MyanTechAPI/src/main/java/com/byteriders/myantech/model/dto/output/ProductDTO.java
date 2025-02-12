package com.byteriders.myantech.model.dto.output;

import java.math.BigDecimal;
import java.time.LocalDate;

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
	private BigDecimal cashback;
	private String serialNumber;
	private Integer stock;
	
	private int categoryId;
	private int productId;
	private int brandId;
	private int createdUserId;
	private int updatedUserId;
	
	private final LocalDate updatedUser = LocalDate.now();
	private LocalDate updatedDate;

}
