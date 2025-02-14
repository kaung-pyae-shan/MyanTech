package com.byteriders.myantech.model.dto.output;

public record ProductDetails(
		int product_id,
		String name,
		int brand,
		int type,
		String brand_name,
		String type_name,
		int price,
		int stocck,
		int cashback,
		String serialNo
		) {

}
