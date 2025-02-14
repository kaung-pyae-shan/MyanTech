	package com.byteriders.myantech.model.entity;
	
	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.ManyToOne;
	import jakarta.persistence.OneToMany;
	import lombok.AllArgsConstructor;
	import lombok.Data;
	import lombok.NoArgsConstructor;
	
	@Entity
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public class ProductOrder {
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;
		@ManyToOne(optional=false)
		private Order order;
		
		
		@ManyToOne
		private Product product;
		private Status status;
		
		private String remark;
		private int qty;
		
		@Column(columnDefinition = "INT DEFAULT 0")
		private int wrongQty;
		
		private String wrongRemark;
		private int faultyQty;
		private String faultyRemark;
		
		public enum Status{
			WRONG, FAULTY, CANCELED
		}
		
		
	}
