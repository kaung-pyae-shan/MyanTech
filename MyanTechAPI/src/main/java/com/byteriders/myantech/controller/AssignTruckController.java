package com.byteriders.myantech.controller;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.input.AssignTruckRequest;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.service.AssignTruckService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/delivery")
@RequiredArgsConstructor
public class AssignTruckController {
	
	private final AssignTruckService assignTruckService;
	
	@PostMapping("/assign")
	public ResponseEntity<Response> assignDriverToOrders(@RequestBody @Valid AssignTruckRequest request) {
        Response response = assignTruckService.assignDriverToOrders(request.getOrderIds(), request.getDriverId(), request.getDeliveryDate());
        return ResponseEntity.ok(response);
    }
	
	@GetMapping("/notassigned")
    public ResponseEntity<Response> getAllOrdersToBeAssigned() {
        Response response = assignTruckService.getAllOrdersToBeAssigned();
        return ResponseEntity.ok(response);
    }

	@PutMapping("/update/{orderId}")
	public ResponseEntity<Response> updateOrderStatus(
	        @PathVariable int orderId,
	        @RequestBody AssignTruckRequest assignTruckRequest) {

	    Response response = assignTruckService.updateOrderStatus(orderId, assignTruckRequest.getStatus());
	    return ResponseEntity.ok(response);
	}


	@GetMapping("/search")
	public ResponseEntity<Response> searchOrdersByStatusAndDateRange(
	    @RequestParam(value = "status", required = false) String status,
	    @RequestParam(value = "startDate", required = false) String startDate,
	    @RequestParam(value = "endDate", required = false) String endDate) {

	    // Convert strings to LocalDate if they are not null
	    LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
	    LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;

	    Response response = assignTruckService.searchOrdersByStatusAndDateRange(status, startDate, endDate);
	    return ResponseEntity.ok(response);
	}


}
