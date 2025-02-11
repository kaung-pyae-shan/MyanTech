package com.byteriders.myantech.model.dto.output;

import java.util.List;

import com.byteriders.myantech.model.entity.Shop.Status;

public record ShopProductDTO(
		List<ShopInfo> shopInfos,
		List<ProductInfo> productInfos
		) {

	public record ShopInfo(
			int shop_id,
	        String shop_name,
	        String shop_address,
	        String township_name,
	        String region_name,
	        Status available_status
			) {}
	
	public record ProductInfo(
			int product_id,
		    String name,
		    String brand,
//		    "type": "Accessories ",
		    int price,
		    int stock,
		    int cashback,
		    String serialNo
			) {}
}
