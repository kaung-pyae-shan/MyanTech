package com.byteriders.myantech.model.service;

import java.time.LocalDate;
import java.util.List;

import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.enums.AssignTruckStatus;

public interface AssignTruckService {
	
    Response assignSingleOrderToDriver(int orderId, int driverId, LocalDate deliveryDate);
    
    Response assignMultipleOrdersToDriver(List<Integer> orderId, int driverId, LocalDate deliveryDate);
    
    Response getAllOrdersToBeAssigned();
    
    Response updateTransactionStatus(int assignTruckId, AssignTruckStatus status);
    
    Response searchAssignTrucks(String status, String township, LocalDate fromDate, LocalDate toDate, int driverId, String keyword);
    
    Response getOrderStatusPending();
}
