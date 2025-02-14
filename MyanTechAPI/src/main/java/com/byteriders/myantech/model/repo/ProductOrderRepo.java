package com.byteriders.myantech.model.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.byteriders.myantech.model.entity.ProductOrder;

public interface ProductOrderRepo extends JpaRepository<ProductOrder, Integer> {

<<<<<<< HEAD
	List<ProductOrder> findByOrderId(int id);
=======
	    // Retrieve all product orders by order_id
	    List<ProductOrder> findByOrder_Id(int orderId);
	

	
>>>>>>> refs/heads/Dashboard
}
