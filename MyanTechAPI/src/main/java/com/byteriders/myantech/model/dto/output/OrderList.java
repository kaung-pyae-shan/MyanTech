package com.byteriders.myantech.model.dto.output;

import java.time.LocalDate;
import java.util.List;

import com.byteriders.myantech.model.entity.Order.Segment;
import com.byteriders.myantech.model.entity.Order.Status;
import com.byteriders.myantech.model.entity.Shop;
import com.byteriders.myantech.model.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderList {
	
	  private int id;
	  private int invoiceNo;
	  private Segment segment;
	  private Shop shopId;
	  private LocalDate createdDate; 
	  private LocalDate updatedDate;
	  private User updatedUser; 
	  private String remarks;  
	  private Status status;
	
	List<ProductList> products;
	

}
