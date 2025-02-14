package com.byteriders.myantech.model.dto.output;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BestSellingProductDto {
	
	private int product_id;
	private String product_name;
	private Long totalSellQuantity;
	
	

}
