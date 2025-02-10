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
public class ServiceCenter {

	@Id
	private int id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String address;
	private String phone;
	private Status availableStatus;
	
	public enum Status{
		OPEN, CLOSED
	}
}
