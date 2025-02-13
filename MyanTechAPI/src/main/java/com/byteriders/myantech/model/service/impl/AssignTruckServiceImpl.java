package com.byteriders.myantech.model.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.output.OrderDTO;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.entity.AssignTruck;
import com.byteriders.myantech.model.entity.Driver;
import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.entity.Order.Status;
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
    private final ModelMapper modelMapper;
	
	@Override
	public Response assignSingleOrderToDriver(int orderId, int driverId, LocalDate deliveryDate) {
		
		Driver driver = driverRepo.findById(driverId)
				.orElseThrow(() -> new NotFoundException("Driver not Found."));
		
		Order order = orderRepo.findById(orderId)
				.orElseThrow(() -> new NotFoundException("Order not found."));
		
		List<AssignTruck> existingAssignTrucks = assignTruckRepo.findByOrderId(orderId);
	    if (!existingAssignTrucks.isEmpty()) {
	        throw new NotFoundException("AssignTruck with orderId " + orderId + " already exists.");
	    }
	    		
		
		order.setStatus(Status.PROCESSING);
		orderRepo.save(order);
		
		AssignTruck assignTruck = AssignTruck.builder()
	                .order(order)
	                .driver(driver)
	                .status(AssignTruckStatus.ASSIGNED)
	                .deliveryDate(deliveryDate)
	                .build();
		
		assignTruckRepo.save(assignTruck);
		
		return Response.builder()
                .status(200)
                .message("Assign Truck Successfully Saved.")
                .build();
       
	}

	@Override
	public Response assignMultipleOrdersToDriver(List<Integer> orderId, int driverId, LocalDate deliveryDate) {
		
		Driver driver = driverRepo.findById(driverId)
                .orElseThrow(() -> new NotFoundException("Driver Not Found"));

    
	    for (Integer orders : orderId) {
	    	Order order = orderRepo.findById(orders)
					.orElseThrow(() -> new NotFoundException("Order not found."));
	    	
	    	List<AssignTruck> existingAssignTrucks = assignTruckRepo.findByOrderId(order.getId());
		    if (!existingAssignTrucks.isEmpty()) {
		        throw new NotFoundException("AssignTruck with invoiceNo: " + order.getInvoiceNo() + " already exists.");
		    }
			
			order.setStatus(Status.PROCESSING);
			orderRepo.save(order);
			
			AssignTruck assignTruck = AssignTruck.builder()
		                .order(order)
		                .driver(driver)
		                .status(AssignTruckStatus.ASSIGNED)
		                .deliveryDate(deliveryDate)
		                .build();
			
			assignTruckRepo.save(assignTruck);
	    }
	    
	    return Response.builder()
                .status(200)
                .message("Assign Truck Successfully Saved.")
                .build();
	}
	
	@Override
	public Response getOrderStatusPending() {
	    // Fetch orders with status "PENDING"
	    List<Order> orders = orderRepo.findByStatus(Order.Status.PENDING);

	    // Check if no orders are found
	    if (orders.isEmpty()) {
	        throw new NotFoundException("No orders found with status: PENDING");
	    }

	    // Initialize ModelMapper
	    ModelMapper modelMapper = new ModelMapper();

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
	
	
//	@Override
//	public Response updateTransactionStatus(int assignTruckId, AssignTruckStatus status) {
//		
//		AssignTruck existingAssignTruck = AssignTruckRepo.findById(assignTruckId)
//				.orElseThrow(() -> new NotFoundException("Assign Truck Not Found!"));
//		
//		existingAssignTruck.setStatus(status);		existingTransaction.setUpdatedAt(LocalDateTime.now());
//		
//		transactionRepository.save(existingTransaction);
//		
//		return Response.builder()
//				.status(200)
//				.message("Transaction Status Successsfully Updated.")
//				.build();
//	}
	
	@Override
	public Response searchAssignTrucks(String status, String township, LocalDate fromDate, LocalDate toDate,
			int driverId, String keyword) {
		// TODO Auto-generated method stub
		return null;
	}

	

	@Override
	public Response getAllOrdersToBeAssigned() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response updateTransactionStatus(int assignTruckId, AssignTruckStatus status) {
		// TODO Auto-generated method stub
		return null;
	}

	

	

}
