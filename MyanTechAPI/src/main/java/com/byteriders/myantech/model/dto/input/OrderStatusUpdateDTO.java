package com.byteriders.myantech.model.dto.input;

import com.byteriders.myantech.model.entity.Order.Status;

public record OrderStatusUpdateDTO(
		int orderId,
		Status status
		) {

}
