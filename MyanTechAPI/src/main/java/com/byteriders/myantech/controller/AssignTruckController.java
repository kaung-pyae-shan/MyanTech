package com.byteriders.myantech.controller;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.input.AssignTruckRequest;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.service.AssignTruckService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/assignTruck")
@RequiredArgsConstructor
public class AssignTruckController {
	
	private final AssignTruckService assignTruckService;	
	
	@PostMapping("/assign-single")
	public ResponseEntity<Response> assignTruckToSingleOrder(
	        @RequestParam int orderId,
	        @RequestParam int driverId,
	        @RequestParam(required = false) LocalDate deliveryDate) {
	    
	return ResponseEntity.ok(assignTruckService.assignSingleOrderToDriver(orderId, driverId, deliveryDate));
	}
	
	@PostMapping("/assign")
	public ResponseEntity<Response> assignTruckToMultipleOrders(
	        @RequestBody AssignTruckRequest assignTruckRequest) {

	    return ResponseEntity.ok(assignTruckService.assignMultipleOrdersToDriver(
	            assignTruckRequest.getOrderId(),
	            assignTruckRequest.getDriverId(),
	            assignTruckRequest.getDeliveryDate()));
	}
	
	@GetMapping("/all")
    public ResponseEntity<Response> getOrderStatusPending() {
        return ResponseEntity.ok(assignTruckService.getOrderStatusPending());
    }


}
