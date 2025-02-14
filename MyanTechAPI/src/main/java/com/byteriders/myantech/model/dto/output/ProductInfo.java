package com.byteriders.myantech.model.dto.output;

public record ProductInfo(
		int product_id,
	    String name,
	    String brand,
	    String type,          
	    int price,
	    int stock,
	    int cashback,        
	    String serialNo
		) {
	
}