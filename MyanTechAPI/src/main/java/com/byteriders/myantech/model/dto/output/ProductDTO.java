package com.byteriders.myantech.model.dto.output;

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
	private int brand;
	private int type;
	private int price;
	private int stock;
	private int cashback;
	private String serialNo;
	private String brand_name;
	private String category_name;

}