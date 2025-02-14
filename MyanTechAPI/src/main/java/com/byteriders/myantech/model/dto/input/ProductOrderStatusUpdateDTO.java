package com.byteriders.myantech.model.dto.input;

import com.byteriders.myantech.model.entity.ProductOrder.Status;

public record ProductOrderStatusUpdateDTO(
		int productOrderId,
		int qty,
		Status status
		) { 

}
