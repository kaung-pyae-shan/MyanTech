package com.byteriders.myantech.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shop {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false, unique = true)
	private String name;
	private String contact;
	@Column(nullable = false)
	private String address;
	@ManyToOne
	@JoinColumn(name = "township_id")
	private Township township;
	@ManyToOne
	@JoinColumn(name = "region_id")
	private Region region;
	@Enumerated(EnumType.STRING)
	private Status availableStatus;
	
	public enum Status{
		OPEN, CLOSED
	}
}
