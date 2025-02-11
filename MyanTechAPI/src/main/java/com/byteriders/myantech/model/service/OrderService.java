package com.byteriders.myantech.model.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.input.OrderForm;
import com.byteriders.myantech.model.dto.output.ShopProductDTO;
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
	
	public ShopProductDTO getFormData() {
		return new ShopProductDTO(shopRepo.getAllShopInfo(), productRepo.getAllProductInfo());
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
}
