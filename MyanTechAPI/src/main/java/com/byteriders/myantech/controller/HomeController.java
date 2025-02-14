package com.byteriders.myantech.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.output.BestSellingProductDto;
import com.byteriders.myantech.model.dto.output.DashBoardData;
import com.byteriders.myantech.model.dto.output.SaleChartDto;
import com.byteriders.myantech.model.dto.output.SaleRecordReport;
import com.byteriders.myantech.model.dto.output.TotalProductsByCategoryDto;
import com.byteriders.myantech.model.service.OrderService;
import com.byteriders.myantech.model.service.ProductService;

@RestController
@RequestMapping("/home")
public class HomeController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private ProductService productService;
	
	@GetMapping
	public ResponseEntity<SaleRecordReport> getTotalSaleToday(){
		SaleRecordReport dto = new SaleRecordReport();
		
		LocalDate today = LocalDate.now();
		dto.setTotalSaleToday(orderService.getTodayOrders(today));
		
		List<BestSellingProductDto> bestDto = orderService.getBestSellingProducts();
		dto.setBestSellingItems(bestDto);
		
		List<TotalProductsByCategoryDto> productsByCategory = productService.getProductsByCategory();
		dto.setTotalProductsByCategoryDtos(productsByCategory);
		
		List<SaleChartDto> chartData = orderService.getSaleByDay();
		dto.setSaleChartRecord(chartData);
		
		List<SaleChartDto> chartDataByYear = orderService.getTotalSaleByMonth(LocalDate.now().getYear());
		dto.setSaleChartRecordByMonth(chartDataByYear);
		
		DashBoardData data = new DashBoardData();
		data.setPendingOrders(orderService.getPending());
		data.setDeliveredOrders(orderService.getDelivered());
		data.setProductsSold(orderService.getSoldProducts());
		data.setTotalProducts(orderService.getTotalStock());
		dto.setData(data);
		
		
		
		return ResponseEntity.ok(dto);
		
	}
	
	

}
