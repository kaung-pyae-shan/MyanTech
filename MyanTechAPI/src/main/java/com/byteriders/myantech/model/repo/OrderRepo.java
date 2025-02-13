package com.byteriders.myantech.model.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.byteriders.myantech.model.entity.Order;

public interface OrderRepo extends JpaRepository<Order, Integer> {

	@Query("SELECT MAX(o.invoiceNo) FROM Order o")
    Optional<Integer> findMaxInvoiceNo();
	
//	@Query("SELECT o FROM Order o WHERE o.status = 'PENDING'")
//    List<Order> findOrdersToBeAssigned();
	
	List<Order> findByStatus(Order.Status status);
	
}
