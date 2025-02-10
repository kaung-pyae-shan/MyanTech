package com.byteriders.myantech.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Driver {

	@Id
	private int id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String vehiclePlateNo;
	@Column(nullable = false)
	private String phone;
}
