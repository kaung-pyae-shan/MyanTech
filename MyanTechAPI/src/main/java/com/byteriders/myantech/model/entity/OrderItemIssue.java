package com.byteriders.myantech.model.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemIssue {

	@Id
	private int id;
	@OneToOne
	@JoinColumn(name = "order_id", nullable = false)
	private Order order;
	@OneToMany
	private List<Product> product;
	private Status status;
	
	private String remark;
	private int qty;
	private int wrongQty;
	private String wrongRemark;
	private int faultyQty;
	private String faultyRemark;
	
	public enum Status{
		WRONG, FAULTY, CANCELED
	}
}
