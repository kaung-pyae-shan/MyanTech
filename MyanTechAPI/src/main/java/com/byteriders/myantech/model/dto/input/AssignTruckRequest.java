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
	
	private int order_id;
	private List<Integer> orderIds;
    private int driver_id;
    private LocalDate delivery_date; 
    private String status;
}
