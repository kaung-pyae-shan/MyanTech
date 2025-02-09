package com.byteriders.myantech.model.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

	@Id
	private int id;
	private int invoiceNo;
	@ManyToOne(optional = false)
	private Shop shop;
	private String remarks;
	@Enumerated(EnumType.STRING)
	private Status status;
	private Segment productSegment;

	@ManyToOne
	private User createdUserId;
	private LocalDate createdDate;
	@ManyToOne
	private User updatedUserId;
	private LocalDate updatedDate;

	public enum Status {
		PENDING, DELIVERED
	}
	
	public enum Segment {
		Consumer, Industrial
	}
}
