package com.byteriders.myantech.model.entity;

import com.byteriders.myantech.model.entity.Shop.Status;

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
public class Township {

	@Id
	private int id;
	@Column(nullable = false)
	private String name;
}
