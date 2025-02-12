package com.byteriders.myantech.model.repo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.byteriders.myantech.model.entity.AssignTruckOrder;

public interface AssignTruckOrderRepo extends JpaRepository<AssignTruckOrder, Integer> {

	@Query("SELECT o FROM AssignTruckOrder o " +
		       "JOIN o.assignTruck t " +
		       "WHERE (:status IS NULL OR o.status = :status) " +
		       "AND (:startDate IS NULL OR t.deliveryDate >= :startDate) " +
		       "AND (:endDate IS NULL OR t.deliveryDate <= :endDate)")
		List<AssignTruckOrder> searchOrdersByStatusAndDateRange(
		    @Param("status") String status,
		    @Param("startDate") LocalDate startDate,
		    @Param("endDate") LocalDate endDate);


    Optional<AssignTruckOrder> findByOrderId(int orderId);
}
