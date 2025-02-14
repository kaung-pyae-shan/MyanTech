<<<<<<< HEAD
package com.byteriders.myantech.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
	@ManyToOne(optional = false)
	private Order order;
	@ManyToOne(optional = false)
	private Product product;
	@Enumerated(EnumType.STRING)
	private Status status;
=======
	package com.byteriders.myantech.model.entity;
>>>>>>> refs/heads/Dashboard
	
<<<<<<< HEAD
	private String remark;
	private int qty;
	@Column(columnDefinition = "INT DEFAULT 0")
	private int wrongQty;
	private String wrongRemark;
	@Column(columnDefinition = "INT DEFAULT 0")
	private int faultyQty;
	private String faultyRemark;
	@Column(columnDefinition = "INT DEFAULT 0")
	private int subTotal;
=======
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
>>>>>>> refs/heads/Dashboard
	
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
<<<<<<< HEAD
}
=======
>>>>>>> refs/heads/Dashboard
