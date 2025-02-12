package com.byteriders.myantech.model.dto.input;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignTruckRequest {
	
	@NotNull(message = "Order Ids are required")
	private List<Integer> orderIds;
	
	@NotNull(message = "Driver Id is required")
    private int driverId;
	
	@NotNull(message = "deliveryDate is required")
    private String deliveryDate;
	
	private String status;

}
