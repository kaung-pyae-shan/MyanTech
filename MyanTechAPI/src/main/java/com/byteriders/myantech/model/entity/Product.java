package com.byteriders.myantech.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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
	
	@NotBlank(message = "Name is required")
	private String name;
	
	@Min(value = 0, message = "Product Price must be a positive value.")
	@Column(columnDefinition = "DECIMAL(10,2) DEFAULT 0.0")
	private BigDecimal price;
	
	@Min(value = 0, message = "Product Price must be a positive value.")
	@Column(columnDefinition = "DECIMAL(10,2) DEFAULT 0.0")
	private BigDecimal cashBack;	

	@NotBlank(message = "Serial Number is required")
	@Column(unique = true)
	private String serialNumber;
	
	@Min(value = 0, message = "Stock quantity cannot be negative.")
	private Integer stockQuantiy;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "brand_id")
	private Brand brand;
	
	private final LocalDateTime createAt = LocalDateTime.now();
	private LocalDateTime updatedAt;
	
	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", price=" + price + ", cashBack=" + cashBack
				+ ", serialNumber=" + serialNumber + ", stockQuantiy=" + stockQuantiy + ", createAt=" + createAt
				+ ", updatedAt=" + updatedAt + "]";
	}
	
	
	
	
}
