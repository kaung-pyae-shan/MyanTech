package com.byteriders.myantech.model.dto.output;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.entity.Order.Status;
import com.byteriders.myantech.model.entity.ProductOrder;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OrderDetails {
	
	int orderId;
	int invoiceNo;
  	int shopId;
  	String shopName;
  	String shopAddress;
  	String contact;
  	String township;
  	String region;
  	LocalDate createdDate;
  	Status orderStatus;
  	List<ProductOrderDetails> products;
  	
  	public OrderDetails(int orderId, int invoiceNo, int shopId, String shopName, String shopAddress, String contact,
			String township, String region, LocalDate createdDate, Status orderStatus) {
		super();
		this.orderId = orderId;
		this.invoiceNo = invoiceNo;
		this.shopId = shopId;
		this.shopName = shopName;
		this.shopAddress = shopAddress;
		this.contact = contact;
		this.township = township;
		this.region = region;
		this.createdDate = createdDate;
		this.orderStatus = orderStatus;
	}

	public static void select(CriteriaQuery<OrderDetails> cq, Root<Order> root) {
		cq.multiselect(
				root.get("id"),
				root.get("invoiceNo"),
				root.get("shop").get("id"),
				root.get("shop").get("name"),
				root.get("shop").get("address"),
				root.get("shop").get("contact"),
				root.get("shop").get("township").get("name"),
				root.get("shop").get("region").get("name"),
				root.get("createdDate"),
				root.get("status")
				);
	}
	
	public static List<ProductOrderDetails> mapProductOrders(List<ProductOrder> productOrders) {
        return productOrders.stream()
            .map(po -> new ProductOrderDetails(
                po.getProduct().getId(),
                po.getProduct().getName(),
                po.getQty(),
                po.getProduct().getPrice(),
                po.getSubTotal(),
                po.getRemark(),
                po.getStatus()
            ))
            .collect(Collectors.toList());
    }

	

}
