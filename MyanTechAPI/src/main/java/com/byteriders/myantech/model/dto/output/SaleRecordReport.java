package com.byteriders.myantech.model.dto.output;

import java.util.List;

import lombok.Data;

@Data
public class SaleRecordReport {
	
	private int totalSaleToday;
	
	List<BestSellingProductDto> bestSellingItems;
	
	List<TotalProductsByCategoryDto> totalProductsByCategoryDtos;
	
	List<SaleChartDto> saleChartRecord;
	
	List<SaleChartDto> saleChartRecordByMonth;
	
	DashBoardData data;

	
	

}
