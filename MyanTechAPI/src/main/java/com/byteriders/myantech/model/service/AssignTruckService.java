package com.byteriders.myantech.model.service;

import java.util.List;

import com.byteriders.myantech.model.dto.output.Response;

public interface AssignTruckService {

	Response assignDriverToOrders(List<Integer> orderIds, int driverId, String deliveryDate);

    Response getAllOrdersToBeAssigned();

    Response updateOrderStatus(int orderId, String status);

    Response searchOrdersByStatusAndDateRange(String status, String startDate, String endDate);

}
