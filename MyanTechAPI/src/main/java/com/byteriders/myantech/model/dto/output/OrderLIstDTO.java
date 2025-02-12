package com.byteriders.myantech.model.dto.output;

import java.time.LocalDate;

import com.byteriders.myantech.model.entity.Order.Status;

public record OrderLIstDTO(
		int orderId,
		int invoiceNo,
		Status orderStatus,
		LocalDate createdDte,
		String shopName,
		String shopAddress,
		String shopContact
		
		
		) {

}
