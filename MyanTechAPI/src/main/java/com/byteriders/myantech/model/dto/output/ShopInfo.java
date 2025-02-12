package com.byteriders.myantech.model.dto.output;

import com.byteriders.myantech.model.entity.Shop.Status;

public record ShopInfo(
		int shop_id,
        String shop_name,
        String shop_address,
        String township_name,
        String region_name,
        Status available_status
		) {
	
}