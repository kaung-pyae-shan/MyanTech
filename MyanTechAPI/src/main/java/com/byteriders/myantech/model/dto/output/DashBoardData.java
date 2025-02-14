package com.byteriders.myantech.model.dto.output;

import lombok.Data;

@Data
public class DashBoardData {
	
	private int pendingOrders;
	private int deliveredOrders;
	private int totalProducts;
	private int productsSold;

}
