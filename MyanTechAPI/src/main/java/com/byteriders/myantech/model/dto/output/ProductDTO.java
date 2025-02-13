package com.byteriders.myantech.model.dto.output;

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
	private int price;
	private int cashback;
	private String serialNumber;
	private int stock;
	private int stockFaulty;
	
	private int categoryId;
	private int productId;
	private int brandId;
	private int createdUserId;
	private int updatedUserId;
	
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
	
	

}