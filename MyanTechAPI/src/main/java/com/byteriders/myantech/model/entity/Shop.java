package com.byteriders.myantech.model.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shop {

	@Id
	private int id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String address;
	@OneToMany
	private List<Township> township;
	@OneToMany
	private List<Region> region;
	private Status availableStatus;
	
	public enum Status{
		OPEN, CLOSED
	}
}
