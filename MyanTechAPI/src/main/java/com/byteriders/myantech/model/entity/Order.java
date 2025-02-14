package com.byteriders.myantech.model.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true)
	private int invoiceNo;
	@ManyToOne(optional = false)
	private Shop shop;
	private String remarks;
	@Enumerated(EnumType.STRING)
	private Status status;
	@Enumerated(EnumType.STRING)
	private Segment productSegment;

	@ManyToOne
	private User createdUser;
	@Column
	private LocalDate createdDate;
	@ManyToOne
	private User updatedUser;
	private LocalDate updatedDate;
	
	@OneToMany(mappedBy = "order")
	private List<ProductOrder> productOrders;

	public enum Status {

		PENDING, DELIVERING, DELIVERED, COMPLETED, CANCELED
	}
	
	public enum Segment {
		Consumer, Industrial
	}
}