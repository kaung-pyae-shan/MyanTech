package com.byteriders.myantech.model.dto.output;

import com.byteriders.myantech.model.entity.Order.Status;
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
public class OrderDTO {
	
	private int id;
	private int invoiceNo;
	private int shopId;
	private int productId;
	private String remarks;
	private Status status;

}
