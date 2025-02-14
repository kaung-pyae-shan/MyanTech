package com.byteriders.myantech.model.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.input.OrderForm;
import com.byteriders.myantech.model.dto.output.BestSellingProductDto;
import com.byteriders.myantech.model.dto.output.DashBoardData;
import com.byteriders.myantech.model.dto.output.OrderAndProductDto;
import com.byteriders.myantech.model.dto.output.ProductInfo;
import com.byteriders.myantech.model.dto.output.ProductOrderDetails;
import com.byteriders.myantech.model.dto.output.SaleChartDto;
import com.byteriders.myantech.model.dto.output.ShopInfo;
import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.entity.Order.Segment;
import com.byteriders.myantech.model.entity.Order.Status;
import com.byteriders.myantech.model.entity.ProductOrder;
import com.byteriders.myantech.model.repo.OrderRepo;
import com.byteriders.myantech.model.repo.ProductOrderRepo;
import com.byteriders.myantech.model.repo.ProductRepo;
import com.byteriders.myantech.model.repo.ShopRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	
	@Autowired
	private OrderRepo orderRepo;
	@Autowired
	private ShopRepo shopRepo;
	@Autowired
	private ProductOrderRepo productOrderRepo;
	@Autowired
	private ProductRepo productRepo;
	
	public List<ShopInfo> getShopFormData() {
		return shopRepo.getAllShopInfo();
	}
	
	public List<ProductInfo> getProductFormData() {
		return productRepo.getAllProductInfo();
	}


	public boolean createOrder(OrderForm form) {
		System.out.println(form.shopId());
		var shop = shopRepo.findById(form.shopId()).get();
		var order = new Order();
		int invoiceNo = generateInvoiceNo();
		order.setShop(shop);
		order.setProductSegment(Segment.Consumer);
		order.setStatus(Status.PENDING);
		order.setInvoiceNo(invoiceNo);
		order.setCreatedDate(LocalDate.now());
		//Order Created User ID
		var savedOrder = orderRepo.save(order);

		List<ProductOrder> productOrders = form.products()
				.stream()
				.map(p -> {
					var product = productRepo.findById(p.productId()).get();
					var productOrder = new ProductOrder();
					productOrder.setOrder(savedOrder);
					productOrder.setProduct(product);
					productOrder.setQty(p.quantity());
					productOrder.setRemark(p.remarks());
					return productOrder;
				})
				.collect(Collectors.toList());
		productOrderRepo.saveAll(productOrders);
		
		return savedOrder != null;
	}
	
	private int generateInvoiceNo() {
		return orderRepo.findMaxInvoiceNo().get();
	}
	
		public List<OrderAndProductDto> getAllOrders() {
        List<Order> orders = orderRepo.findAllOrdersWithDetails();

        return orders.stream().map(order -> {
            OrderAndProductDto orderDto = new OrderAndProductDto();
            orderDto.setId(order.getId());
            orderDto.setInvoiceNo("INV-" + order.getCreatedDate() + "-" + order.getInvoiceNo());
            orderDto.setShopId(Integer.toHexString(order.getShop().getId()));
            orderDto.setShopName(order.getShop().getName());
            orderDto.setShopAddress(order.getShop().getAddress());
            orderDto.setContact(order.getShop().getContact());
            orderDto.setTownshipId(order.getShop().getTownship().getId());
            orderDto.setTownshipName(order.getShop().getTownship().getName());
            orderDto.setRegionId(order.getShop().getRegion().getId());
            orderDto.setRegionName(order.getShop().getRegion().getName());
            orderDto.setOrderStatus(order.getStatus().toString().toLowerCase());

            // Convert products
            List<ProductOrderDetails> products = order.getProductOrders().stream()
            	    .map(productOrder -> {
            	        ProductOrderDetails productDto = new ProductOrderDetails();
            	        productDto.setProductId(Integer.toHexString(productOrder.getProduct().getId()));
            	        productDto.setProductName(productOrder.getProduct().getName());
            	        productDto.setQuantity(productOrder.getQty());
            	        productDto.setUnitPrice(productOrder.getProduct().getPrice());
            	        productDto.setSubtotal(productOrder.getQty() * productOrder.getProduct().getPrice());
            	        productDto.setRemark(productOrder.getRemark());
            	        return productDto;
            	    })
            	    .collect(Collectors.toList());

            orderDto.setProducts(products);
            return orderDto;
        }).collect(Collectors.toList());
    }

		public int getTodayOrders(LocalDate today) {
			int[] todayOrders = orderRepo.getTodayOrders(today);
			int total = 0;
			for (int i : todayOrders) {
				System.out.println("i : " + i);
				total += orderRepo.getTotalSaleForOrder(i);
			} 
			return total;
		}
		
		
		public List<BestSellingProductDto> getBestSellingProducts() {
			LocalDate threeMonthsAgo = LocalDate.now().minusMonths(3);
			return orderRepo.getBestSelling(threeMonthsAgo);
			
		}

		public List<SaleChartDto> getSaleByDay() {
		    return orderRepo.findSalesForCurrentMonth().stream()
		        .map(obj -> new SaleChartDto(
		            (String) obj[0],  
		            obj[1] != null ? ((Number) obj[1]).intValue() : 0
		            
		        ))
		        .collect(Collectors.toList());
		}
		
		public List<SaleChartDto> getTotalSaleByMonth(int year) {
			return orderRepo.getTotalSalesByMonth(year).stream().map(obj -> new SaleChartDto(
						(String) obj[0],
						obj[1] != null ? ((Number) obj[1]).intValue() : 0
					)).collect(Collectors.toList());
		}

		public int getPending() {
			return orderRepo.getPendingCount();
		}
		
		public int getDelivered() {
			return orderRepo.getDeliveredCount();
		}
		
		public int getTotalStock() {
			return orderRepo.getTotalStock();
		}
		
		public int getSoldProducts() {
			return orderRepo.getSoldProducts();
		}
	
    
}
