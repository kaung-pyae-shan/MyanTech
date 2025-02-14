package com.byteriders.myantech.model.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.repo.custom.OrderRepoCustom;

public interface OrderRepo extends JpaRepository<Order, Integer>, OrderRepoCustom {

	@Query("SELECT MAX(o.invoiceNo) FROM Order o")
    Optional<Integer> findMaxInvoiceNo();
	
	 @Query("SELECT o FROM Order o WHERE o.status = :status AND o.id NOT IN (SELECT a.order.id FROM AssignTruck a)")
	 List<Order> findOrdersWithPendingStatusAndNotAssigned(@Param("status") Order.Status status);
	
	List<Order> findByStatus(Order.Status status);
	
}
