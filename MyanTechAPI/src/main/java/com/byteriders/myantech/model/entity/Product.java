package com.byteriders.myantech.model.entity;

import java.time.LocalDate;

import com.byteriders.myantech.model.entity.User.Role;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

	@Id
	private int id;
	private String model;
	@ManyToOne(optional = false)
	private Category category;
	@ManyToOne(optional = false)
	private Brand brand;
	private int price;
	private int cashback;
	private String serialNumber;
	private int stock;
	private int stockFaulty;
	
	@ManyToOne
	private User createdUserId;
	private LocalDate createdDate;
	@ManyToOne
	private User updatedUserId;
	private LocalDate updatedDate;
}
