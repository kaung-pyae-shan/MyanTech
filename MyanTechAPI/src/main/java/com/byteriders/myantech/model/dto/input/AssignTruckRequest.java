package com.byteriders.myantech.model.dto.input;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignTruckRequest {
	
	private List<Integer> orderId;
    private int driverId;
    private LocalDate deliveryDate; 
}
