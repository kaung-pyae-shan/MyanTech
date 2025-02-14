package com.byteriders.myantech.model.service;

import java.time.LocalDate;

import com.byteriders.myantech.model.dto.input.AssignTruckRequest;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.entity.AssignTruck;

public interface AssignTruckService {
	
    Response assignSingleOrderToDriver(AssignTruckRequest assignTruckRequest);
    
    Response assignMultipleOrdersToDriver(AssignTruckRequest assignTruckRequest);
    
    Response searchAssignTrucks(String status, String township, LocalDate fromDate, LocalDate toDate, int driverId, String keyword);
    
    Response getOrderStatusPending();
    
    Response getOrdersByAssignTruckStatusDelivering();
    
    Response getOrdersByAssignTruckStatusDelivered();
    
    Response getOrdersByAssignTruckStatusCanceled();

    Response updateAssignTruckStatus(int assignTruckId, AssignTruck request);

	Response getAllAssignTrucks();
}
