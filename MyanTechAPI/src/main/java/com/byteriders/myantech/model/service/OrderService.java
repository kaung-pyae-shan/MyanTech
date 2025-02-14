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
	@Autowired
	private ProductService productService;

	public List<ShopInfo> getShopFormData() {
		return shopRepo.getAllShopInfo();
	}

	public List<ProductInfo> getProductFormData() {
		return productRepo.getAllProductInfo();
	}

	public boolean createOrder(OrderForm form) {
		var shop = shopRepo.findById(form.shopId()).get();
		var order = new Order();
		int invoiceNo = generateInvoiceNo();
		order.setShop(shop);
		order.setProductSegment(Segment.Consumer);
		order.setStatus(Status.PENDING);
		order.setInvoiceNo(invoiceNo);
		order.setCreatedDate(LocalDate.now());
		// Order Created User ID
		var savedOrder = orderRepo.save(order);

		List<ProductOrder> productOrders = form.products().stream().map(p -> {
			Product product = productRepo.findById(p.productId()).get();
			var productOrder = new ProductOrder();
			productOrder.setOrder(savedOrder);
			productOrder.setProduct(product);
			productOrder.setQty(p.quantity());
			productOrder.setRemark(p.remarks());
			productOrder.setSubTotal(product.getPrice() * p.quantity());
			return productOrder;
		}).collect(Collectors.toList());
		productOrderRepo.saveAll(productOrders);

		productService.subtractProductQty(productOrders);
		return savedOrder != null;
	}

	public List<OrderDetails> getAllOrderDetails(OrderSearch search) {
		return orderRepo.searchAllOrderDetails(search);
	}

	public boolean updateOrderStatus(OrderStatusUpdateDTO statusUpdate) {
		switch (statusUpdate.status()) {
		case PENDING: {
			restockInventoryProduct(Status.PENDING, statusUpdate.orderId());
			updateOrderStatus(Status.PENDING, statusUpdate.orderId());
			break;
		}
		case DELIVERING: {
			updateOrderStatus(Status.DELIVERING, statusUpdate.orderId());
			break;
		}
		case DELIVERED: {
			updateOrderStatus(Status.DELIVERED, statusUpdate.orderId());
			break;
		}
		case COMPLETED: {
			updateOrderStatus(Status.COMPLETED, statusUpdate.orderId());
			break;
		}
		case CANCELED: {
			restockInventoryProduct(Status.CANCELED, statusUpdate.orderId());
			updateOrderStatus(Status.CANCELED, statusUpdate.orderId());
			break;
		}
		default:
			return false;
		}
		return true;
	}

	public boolean updateProductOrderStatus(ProductOrderStatusUpdateDTO statusUpdate) {
		switch (statusUpdate.status()) {
		case WRONG: {
			restockInventoryProductOrder(com.byteriders.myantech.model.entity.ProductOrder.Status.WRONG,
					statusUpdate.productOrderId(), statusUpdate.qty());
			updateProductOrderStatus(com.byteriders.myantech.model.entity.ProductOrder.Status.WRONG,
					statusUpdate.productOrderId());
			break;
		}
		case FAULTY: {
			var productOrder = productOrderRepo.findById(statusUpdate.productOrderId()).orElseThrow();
			productOrder.setFaultyQty(statusUpdate.qty());
			productOrderRepo.save(productOrder);
			updateProductOrderStatus(com.byteriders.myantech.model.entity.ProductOrder.Status.FAULTY,
					statusUpdate.productOrderId());
			break;
		}
		case CANCELED: {
			restockInventoryProductOrder(com.byteriders.myantech.model.entity.ProductOrder.Status.CANCELED,
					statusUpdate.productOrderId(), statusUpdate.qty());
			updateProductOrderStatus(com.byteriders.myantech.model.entity.ProductOrder.Status.CANCELED,
					statusUpdate.productOrderId());
			break;
		}
		default:
			return false;
		}
		return true;
	}

	private void restockInventoryProductOrder(com.byteriders.myantech.model.entity.ProductOrder.Status updatedStatus,
			int productOrderId, int returnedQty) {
		var productOrder = productOrderRepo.findById(productOrderId).orElseThrow();
		com.byteriders.myantech.model.entity.ProductOrder.Status currentStatus = productOrder.getStatus();

		// no need to restock
		if (updatedStatus == currentStatus)
			return;

		var product = productRepo.findById(productOrder.getProduct().getId()).orElseThrow();
		product.setStock(product.getStock() + returnedQty);
		productRepo.save(product);
	}

	private int generateInvoiceNo() {
		return orderRepo.findMaxInvoiceNo().get() + 1;
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
		return total;
	}
		
		public List<SaleChartDto> getTotalSaleByMonth(int year) {
			return orderRepo.getTotalSalesByMonth(year).stream().map(obj -> new SaleChartDto(
						(String) obj[0],
						obj[1] != null ? ((Number) obj[1]).intValue() : 0
					)).collect(Collectors.toList());
		}
		
		public List<SaleChartDto> getTotalSaleByMonth(int year) {
			return orderRepo.getTotalSalesByMonth(year).stream().map(obj -> new SaleChartDto(
						(String) obj[0],
						obj[1] != null ? ((Number) obj[1]).intValue() : 0
					)).collect(Collectors.toList());
		}

	public List<BestSellingProductDto> getBestSellingProducts() {
		LocalDate threeMonthsAgo = LocalDate.now().minusMonths(3);
		return orderRepo.getBestSelling(threeMonthsAgo);

	}

	public List<SaleChartDto> getSaleByDay() {
		return orderRepo.findSalesForCurrentMonth().stream()
				.map(obj -> new SaleChartDto((String) obj[0], obj[1] != null ? ((Number) obj[1]).intValue() : 0

				)).collect(Collectors.toList());
	}

	
    
}
