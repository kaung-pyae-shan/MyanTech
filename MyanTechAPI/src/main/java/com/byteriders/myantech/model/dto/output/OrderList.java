package com.byteriders.myantech.model.dto.output;

import java.time.LocalDate;

import com.byteriders.myantech.model.entity.Order.Segment;
import com.byteriders.myantech.model.entity.Order.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderList {
	
	  private int id;
	  private int invoiceNo;
	  private Segment segment;
	  
	  private int shopId;
	  private String shopName;
	  private String shopAddress;
	  private String context;
	  private String townshipName;
	  private String regionName;
	  
	  private LocalDate createdDate; 
	  private String remarks;  
	  
	  private Status status;
	
	

}
