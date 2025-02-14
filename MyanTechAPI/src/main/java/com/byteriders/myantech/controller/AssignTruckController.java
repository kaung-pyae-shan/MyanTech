package com.byteriders.myantech.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.input.AssignTruckRequest;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.entity.AssignTruck;
import com.byteriders.myantech.model.service.AssignTruckService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/assign_truck")
@RequiredArgsConstructor
public class AssignTruckController {
	
	private final AssignTruckService assignTruckService;	
	
	@PostMapping("/assign-single")
	public ResponseEntity<Response> assignTruckToSingleOrder(@RequestBody AssignTruckRequest assignTruckRequest) {
	    
	return ResponseEntity.ok(assignTruckService.assignSingleOrderToDriver(assignTruckRequest));
	}
	
	@PostMapping("/assign-mutiple")
	public ResponseEntity<Response> assignTruckToMultipleOrders(@RequestBody AssignTruckRequest assignTruckRequest) {

	    return ResponseEntity.ok(assignTruckService.assignMultipleOrdersToDriver(assignTruckRequest));
	}
	
	@GetMapping("/pending")
    public ResponseEntity<Response> getOrderStatusPending() {
        return ResponseEntity.ok(assignTruckService.getOrderStatusPending());
    }
	
	@GetMapping("/delivering")
    public ResponseEntity<Response> getOrderStatusDelivering() {
        return ResponseEntity.ok(assignTruckService.getOrdersByAssignTruckStatusDelivering());
    }
	
	@GetMapping("delivered")
    public ResponseEntity<Response> getOrderStatusDelivered() {
        return ResponseEntity.ok(assignTruckService.getOrdersByAssignTruckStatusDelivered());
    }
	
	@GetMapping("/cancelled")
    public ResponseEntity<Response> getOrderStatusCanceled() {
        return ResponseEntity.ok(assignTruckService.getOrdersByAssignTruckStatusCanceled());
    }
	
	@GetMapping("/list")
    public ResponseEntity<Response> getAllAssignTrucks() {
        return ResponseEntity.ok(assignTruckService.getAllAssignTrucks());
    }
	
	@PutMapping("/{assignTruckId}")
    public ResponseEntity<Response> updateAssignTruckStatus(
            @PathVariable int assignTruckId,  
            @RequestBody AssignTruck request) {  

        Response response = assignTruckService.updateAssignTruckStatus(assignTruckId, request);
        return ResponseEntity.ok(response);
    }


}
