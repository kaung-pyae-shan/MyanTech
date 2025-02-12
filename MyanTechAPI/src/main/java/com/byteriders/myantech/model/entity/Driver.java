package com.byteriders.myantech.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Driver {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String vehiclePlateNo;
	
	@Column(nullable = false)
	private String phone;
	
	@OneToOne
	private AssignTruck assignedDelivery;

	@Override
	public String toString() {
		return "Driver [id=" + id + ", name=" + name + ", vehiclePlateNo=" + vehiclePlateNo + ", phone=" + phone + "]";
	}
	
	
}
