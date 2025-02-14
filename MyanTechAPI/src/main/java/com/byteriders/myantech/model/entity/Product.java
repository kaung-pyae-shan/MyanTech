package com.byteriders.myantech.model.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	@ManyToOne(optional = false)
	private Category category;
	@ManyToOne(optional = false)
	private Brand brand;
	private int price;
	private int cashback;
	private String serialNumber;
	private int stock;
	@Column(columnDefinition = "INT DEFAULT 0")
	private int stockFaulty;
	
	@ManyToOne
	private User createdUser;
	private LocalDate createdDate;
	@ManyToOne
	private User updatedUser;
	private LocalDate updatedDate;
}