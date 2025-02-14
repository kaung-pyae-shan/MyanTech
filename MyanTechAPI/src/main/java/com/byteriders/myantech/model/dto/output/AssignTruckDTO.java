package com.byteriders.myantech.model.dto.output;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssignTruckDTO {
	
	private int id;
    private int order_id;
    private int driver_id;
    private LocalDate delivery_date;
    private String driver_name;
    private String vehicle_plate_no;
    private String status;
}
