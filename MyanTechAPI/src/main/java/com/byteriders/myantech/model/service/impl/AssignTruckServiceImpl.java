package com.byteriders.myantech.model.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.output.AssignTruckOrderDTO;
import com.byteriders.myantech.model.dto.output.OrderDTO;
import com.byteriders.myantech.model.dto.output.Response;
import com.byteriders.myantech.model.entity.AssignTruck;
import com.byteriders.myantech.model.entity.AssignTruckOrder;
import com.byteriders.myantech.model.entity.Driver;
import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.entity.Order.Status;
import com.byteriders.myantech.model.enums.DeliveryStatus;
import com.byteriders.myantech.model.exception.NotFoundException;
import com.byteriders.myantech.model.repo.AssignTruckOrderRepo;
import com.byteriders.myantech.model.repo.AssignTruckRepo;
import com.byteriders.myantech.model.repo.DriverRepo;
import com.byteriders.myantech.model.repo.OrderRepo;
import com.byteriders.myantech.model.repo.UserRepo;
import com.byteriders.myantech.model.service.AssignTruckService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssignTruckServiceImpl implements AssignTruckService {

	private final OrderRepo orderRepo;
    private final DriverRepo driverRepo;
    private final AssignTruckRepo assignTruckRepo;
    private final UserRepo userRepo;
    private final AssignTruckOrderRepo assignTruckOrderRepo;
	private final ModelMapper modelMapper;
    
	@Override
	public Response assignDriverToOrders(List<Integer> orderIds, int driverId, String deliveryDate) {
		 
		Driver driver = driverRepo.findById(driverId)
	                .orElseThrow(() -> new NotFoundException("Driver Not Found"));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate parsedDeliveryDate = LocalDate.parse(deliveryDate, formatter);
        
        AssignTruck assignTruck = AssignTruck.builder()
	                .driver(driver)
	                .deliveryDate(parsedDeliveryDate)
	                .build();

        assignTruckRepo.save(assignTruck);
        
        for (Integer orderId : orderIds) {
            Order order = orderRepo.findById(orderId)
                    .orElseThrow(() -> new NotFoundException("Order Not Found"));

            AssignTruckOrder assignTruckOrder = AssignTruckOrder.builder()
                    .assignTruck(assignTruck)
                    .order(order)
                    .status(DeliveryStatus.ASSIGNED) // Initially, the status will be assigned
                    .updatedDate(LocalDateTime.now())
                    .build();
            
            assignTruckOrderRepo.save(assignTruckOrder);
            
            order.setStatus(Status.PROCESSING);
            orderRepo.save(order);
        }

	        return Response.builder()
	        		.status(200)
	        		.message("Orders successfully assigned to the driver.")
	        		.build();
	}
	
	@Override
	public Response getAllOrdersToBeAssigned() {
		
		List<Order> orders = orderRepo.findOrdersToBeAssigned();
		
		if (orders.isEmpty()) {
			throw new NotFoundException("No orders found for to assign.");
		}
		
		List<OrderDTO> OrderDTOlist = modelMapper.map(orders, new TypeToken<List<OrderDTO>>() {}.getType());
		

        return Response.builder()
        		.status(200)
        		.message("success")
        		.orders(OrderDTOlist)
        		.build();
	}
	
	
	@Override
	public Response updateOrderStatus(int orderId, String status) {
		
		AssignTruckOrder assignTruckOrder = assignTruckOrderRepo.findByOrderId(orderId)
                .orElseThrow(() -> new NotFoundException("Order Not Found"));

		assignTruckOrder.setStatus(DeliveryStatus.valueOf(status));
		assignTruckOrder.setUpdatedDate(LocalDateTime.now());
        assignTruckOrderRepo.save(assignTruckOrder);

        return Response.builder()
        		.status(200)
        		.message("Order status updated successfully.")
        		.build();
	}
	
	@Override
	public Response searchOrdersByStatusAndDateRange(String status, String startDate, String endDate) {
		
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        List<AssignTruckOrder> assignTruckOrders = assignTruckOrderRepo
                .searchOrdersByStatusAndDateRange(status, start, end);
        
		if (assignTruckOrders.isEmpty()) {
			throw new NotFoundException("No orders found for the given status and date range.");
		}
		
		List<AssignTruckOrderDTO> AssignTruckOrderDTOList = modelMapper.map(assignTruckOrders, new TypeToken<List<AssignTruckOrderDTO>>() {}.getType());

        return Response.builder()
        		.status(200)
        		.message("success")
        		.assignTruckOrders(AssignTruckOrderDTOList)
        		.build();
        
        
	}   
	

}
