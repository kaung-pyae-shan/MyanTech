package com.byteriders.myantech.model.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.input.AssignTruckRequest;
import com.byteriders.myantech.model.dto.output.OrderDTO;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.entity.AssignTruck;
import com.byteriders.myantech.model.entity.Driver;
import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.enums.AssignTruckStatus;
import com.byteriders.myantech.model.exception.NotFoundException;
import com.byteriders.myantech.model.repo.AssignTruckRepo;
import com.byteriders.myantech.model.repo.DriverRepo;
import com.byteriders.myantech.model.repo.OrderRepo;
import com.byteriders.myantech.model.service.AssignTruckService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssignTruckServiceImpl implements AssignTruckService {
	
	private final AssignTruckRepo assignTruckRepo;
    private final OrderRepo orderRepo;
    private final DriverRepo driverRepo;
	
	@Override
	public Response assignSingleOrderToDriver(AssignTruckRequest request) {
		
		Driver driver = driverRepo.findById(request.getDriver_id())
				.orElseThrow(() -> new NotFoundException("Driver not Found."));
		
		Order order = orderRepo.findById(request.getOrder_id())
				.orElseThrow(() -> new NotFoundException("Order not found."));
		
		List<AssignTruck> existingAssignTrucks = assignTruckRepo.findByOrderId(request.getOrder_id());
	    if (!existingAssignTrucks.isEmpty()) {
	        throw new NotFoundException("AssignTruck with orderId " + request.getOrder_id() + " already exists.");
	    }
	    		
		
//		order.setStatus(Status.DELIVERED);
//		orderRepo.save(order);
		
		AssignTruck assignTruck = AssignTruck.builder()
	                .order(order)
	                .driver(driver)
	                .status(AssignTruckStatus.DELIVERING)
	                .deliveryDate(request.getDelivery_date())
	                .build();
		
		assignTruckRepo.save(assignTruck);
		
		return Response.builder()
                .status(200)
                .message("Assign Truck Successfully Saved.")
                .build();
       
	}

	@Override
	public Response assignMultipleOrdersToDriver(AssignTruckRequest request) {
		
		Driver driver = driverRepo.findById(request.getDriver_id())
                .orElseThrow(() -> new NotFoundException("Driver Not Found"));

    
	    for (Integer orders : request.getOrderIds()) {
	    	Order order = orderRepo.findById(orders)
					.orElseThrow(() -> new NotFoundException("Order not found."));
	    	
	    	List<AssignTruck> existingAssignTrucks = assignTruckRepo.findByOrderId(order.getId());
		    if (!existingAssignTrucks.isEmpty()) {
		        throw new NotFoundException("AssignTruck with invoiceNo: " + order.getInvoiceNo() + " already exists.");
		    }
			
//			order.setStatus(Status.DELIVERED);
//			orderRepo.save(order);
			
			AssignTruck assignTruck = AssignTruck.builder()
		                .order(order)
		                .driver(driver)
		                .status(AssignTruckStatus.DELIVERING)
		                .deliveryDate(request.getDelivery_date())
		                .build();
			
			assignTruckRepo.save(assignTruck);
	    }
	    
	    return Response.builder()
                .status(200)
                .message("Assign Truck Successfully Saved.")
                .build();
	}
	
	@Override
    public Response updateAssignTruckStatus(int assignTruckId, AssignTruck request) {
        
        AssignTruck assignTruck = assignTruckRepo.findById(assignTruckId)
                .orElseThrow(() -> new NotFoundException("AssignTruck not found for ID: " + assignTruckId));

        assignTruck.setStatus(request.getStatus());
        assignTruckRepo.save(assignTruck);

        return Response.builder()
				.status(200)
				.message("Assign Truck Status Was Successfully Updated")
				.build();
    }
	
	@Override
	public Response getOrderStatusPending() {
	    // Fetch orders with status "PENDING"
		List<Order> orders = orderRepo.findOrdersWithPendingStatusAndNotAssigned(Order.Status.PENDING);

	    // Check if no orders are found
	    if (orders.isEmpty()) {
	        throw new NotFoundException("No orders found with status: PENDING");
	    }


	    // Manually map the fields for each Order to OrderDTO
	    List<OrderDTO> orderResponseDTOList = orders.stream().map(order -> {
	        OrderDTO orderDTO = new OrderDTO();
	        // Manually set the fields for OrderDTO
	        orderDTO.setId(order.getId());
	        orderDTO.setInvoice_no(order.getInvoiceNo());
	        orderDTO.setShop_name(order.getShop().getName());
	        orderDTO.setTownship_name(order.getShop().getTownship().getName());
	        orderDTO.setOrder_status(order.getStatus().toString()); // Convert Enum to String
	        return orderDTO;
	    }).collect(Collectors.toList());

	    // Build and return the response with the list of OrderDTOs
	    return Response.builder()
	            .status(200)
	            .message("Pending orders found successfully")
	            .orders(orderResponseDTOList) // Add list of OrderDTO to the response
	            .build();
	}
	
	@Override
	public Response getOrdersByAssignTruckStatusDelivering() {
		
	    List<AssignTruck> assignTrucks = assignTruckRepo.findByStatus(AssignTruckStatus.DELIVERING);

	    // Check if no assignments are found
	    if (assignTrucks.isEmpty()) {
	        throw new NotFoundException("No truck assignments found with status: DELIVERING");
	    }

	    // Map each AssignTruck to its corresponding Order details
	    List<OrderDTO> orderResponseDTOList = assignTrucks.stream().map(assignTruck -> {
	        // Get the associated Order for this AssignTruck
	        Order order = orderRepo.findById(assignTruck.getOrder().getId())
	                .orElseThrow(() -> new NotFoundException("Order not found for ID: " + assignTruck.getOrder().getId()));

	        // Create the OrderDTO and populate it with information
	        OrderDTO orderDTO = new OrderDTO();
	        orderDTO.setId(order.getId());
	        orderDTO.setInvoice_no(order.getInvoiceNo());
	        orderDTO.setShop_name(order.getShop().getName());
	        orderDTO.setTownship_name(order.getShop().getTownship().getName());
	        orderDTO.setDriver_name(assignTruck.getDriver().getDriverName());
	        orderDTO.setVehicle_plate_no(assignTruck.getDriver().getVehiclePlateNo());
	        orderDTO.setDelivery_status(assignTruck.getStatus() != null ? assignTruck.getStatus().toString() : "Unknown");
//	        orderDTO.setOrder_status(order.getStatus() != null ? order.getStatus().toString() : "Unknown");
	        
	        return orderDTO;
	    }).collect(Collectors.toList());

	    // Build and return the response with the list of OrderDTOs
	    return Response.builder()
	            .status(200)
	            .message("Orders with truck assignment status 'DELIVERED' found successfully")
	            .orders(orderResponseDTOList) // Add list of OrderDTO to the response
	            .build();
	}


	@Override
	public Response getOrdersByAssignTruckStatusDelivered() {
	    // Fetch orders with DELIVERED status from the AssignTruck table
	    List<AssignTruck> assignTrucks = assignTruckRepo.findByStatus(AssignTruckStatus.DELIVERED);

	    // Check if no assignments are found
	    if (assignTrucks.isEmpty()) {
	        throw new NotFoundException("No truck assignments found with status: DELIVERED");
	    }

	    // Map each AssignTruck to its corresponding Order details
	    List<OrderDTO> orderResponseDTOList = assignTrucks.stream().map(assignTruck -> {
	        // Get the associated Order for this AssignTruck
	        Order order = orderRepo.findById(assignTruck.getOrder().getId())
	                .orElseThrow(() -> new NotFoundException("Order not found for ID: " + assignTruck.getOrder().getId()));

	        // Create the OrderDTO and populate it with information
	        OrderDTO orderDTO = new OrderDTO();
	        orderDTO.setId(order.getId());
	        orderDTO.setInvoice_no(order.getInvoiceNo());
	        orderDTO.setShop_name(order.getShop().getName());
	        orderDTO.setDriver_name(assignTruck.getDriver().getDriverName());
	        orderDTO.setVehicle_plate_no(assignTruck.getDriver().getVehiclePlateNo());
	        orderDTO.setTownship_name(order.getShop().getTownship().getName());
	        orderDTO.setDelivery_status(assignTruck.getStatus() != null ? assignTruck.getStatus().toString() : "Unknown");

	        return orderDTO;
	    }).collect(Collectors.toList());

	    // Build and return the response with the list of OrderDTOs
	    return Response.builder()
	            .status(200)
	            .message("Orders with truck assignment status 'DELIVERED' found successfully")
	            .orders(orderResponseDTOList) // Add list of OrderDTO to the response
	            .build();
	}
	
	@Override
	public Response getOrdersByAssignTruckStatusCanceled() {
	    // Fetch orders with DELIVERED status from the AssignTruck table
	    List<AssignTruck> assignTrucks = assignTruckRepo.findByStatus(AssignTruckStatus.CANCELLED);

	    // Check if no assignments are found
	    if (assignTrucks.isEmpty()) {
	        throw new NotFoundException("No truck assignments found with status: CANCELLED");
	    }

	    // Map each AssignTruck to its corresponding Order details
	    List<OrderDTO> orderResponseDTOList = assignTrucks.stream().map(assignTruck -> {
	        // Get the associated Order for this AssignTruck
	        Order order = orderRepo.findById(assignTruck.getOrder().getId())
	                .orElseThrow(() -> new NotFoundException("Order not found for ID: " + assignTruck.getOrder().getId()));

	        // Create the OrderDTO and populate it with information
	        OrderDTO orderDTO = new OrderDTO();
	        orderDTO.setId(order.getId());
	        orderDTO.setInvoice_no(order.getInvoiceNo());
	        orderDTO.setShop_name(order.getShop().getName());
	        orderDTO.setDriver_name(assignTruck.getDriver().getDriverName());
	        orderDTO.setVehicle_plate_no(assignTruck.getDriver().getVehiclePlateNo());
	        orderDTO.setTownship_name(order.getShop().getTownship().getName());
	        orderDTO.setDelivery_status(assignTruck.getStatus() != null ? assignTruck.getStatus().toString() : "Unknown");

	        return orderDTO;
	    }).collect(Collectors.toList());

	    // Build and return the response with the list of OrderDTOs
	    return Response.builder()
	            .status(200)
	            .message("Orders with truck assignment status 'DELIVERED' found successfully")
	            .orders(orderResponseDTOList) // Add list of OrderDTO to the response
	            .build();
	}
	
	@Override
	public Response getAllAssignTrucks() {
		 // Fetch orders with DELIVERED status from the AssignTruck table
	    List<AssignTruck> assignTrucks = assignTruckRepo.findAll();

	    // Check if no assignments are found
	    if (assignTrucks.isEmpty()) {
	        throw new NotFoundException("No truck assignments found with status: CANCELLED");
	    }

	    // Map each AssignTruck to its corresponding Order details
	    List<OrderDTO> orderResponseDTOList = assignTrucks.stream().map(assignTruck -> {
	        // Get the associated Order for this AssignTruck
	        Order order = orderRepo.findById(assignTruck.getOrder().getId())
	                .orElseThrow(() -> new NotFoundException("Order not found for ID: " + assignTruck.getOrder().getId()));

	        // Create the OrderDTO and populate it with information
	        OrderDTO orderDTO = new OrderDTO();
	        orderDTO.setId(order.getId());
	        orderDTO.setInvoice_no(order.getInvoiceNo());
	        orderDTO.setShop_name(order.getShop().getName());
	        orderDTO.setTownship_name(order.getShop().getTownship().getName());
	        orderDTO.setDriver_name(assignTruck.getDriver().getDriverName());
	        orderDTO.setVehicle_plate_no(assignTruck.getDriver().getVehiclePlateNo());
	        orderDTO.setDelivery_status(assignTruck.getStatus() != null ? assignTruck.getStatus().toString() : "Unknown");

	        return orderDTO;
	    }).collect(Collectors.toList());

	    // Build and return the response with the list of OrderDTOs
	    return Response.builder()
	            .status(200)
	            .message("Orders with truck assignment status 'DELIVERED' found successfully")
	            .orders(orderResponseDTOList) // Add list of OrderDTO to the response
	            .build();
	}
	
	
	
	
	
	
	
	
	
	
	@Override
	public Response searchAssignTrucks(String status, String township, LocalDate fromDate, LocalDate toDate,
			int driverId, String keyword) {
		// TODO Auto-generated method stub
		return null;
	}

	

	


}
