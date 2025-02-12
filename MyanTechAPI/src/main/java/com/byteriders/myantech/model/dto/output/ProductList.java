package com.byteriders.myantech.model.dto.output;

import com.byteriders.myantech.model.entity.Brand;
import com.byteriders.myantech.model.entity.ProductOrder.Status;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class ProductList {
	
	private int id;
	private Brand product_brand;
	private String product_model;
	private int qty;
	private Status status;
	private int wrong_qty;
	private String faultyRemark;
	private String remark;
	private String wrong_remark;
	
	

}
