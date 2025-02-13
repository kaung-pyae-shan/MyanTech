package com.byteriders.myantech.model.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.byteriders.myantech.model.entity.AssignTruck;

public interface AssignTruckRepo extends JpaRepository<AssignTruck, Integer> {
	
	 List<AssignTruck> findByOrderId(int orderId);
	 
}
