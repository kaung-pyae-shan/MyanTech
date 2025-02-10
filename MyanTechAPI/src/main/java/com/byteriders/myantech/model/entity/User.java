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
public class User {

	@Id
	private int id;
	@Column(nullable = false)
	private String username;
	@Column(nullable = false)
	private String password;
	private Role role;
	
	public enum Role {
		SALE, WAREHOUSE
	}
}
