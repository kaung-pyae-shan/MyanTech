package com.byteriders.myantech.model.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignedTruck {

	@Id
	private int id;
	@OneToMany
	private List<Order> order;
	@OneToOne
	private Driver driver;
	private LocalDate deliveryDate;
}
