package com.byteriders.myantech.model.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
	
	private int id;
	private String name;
	private int brand;
	private int type;
	private int price;
	private int stock;
	private int cashback;
	private String serialNo;
	private String brand_name;
	private String type_name;

}
