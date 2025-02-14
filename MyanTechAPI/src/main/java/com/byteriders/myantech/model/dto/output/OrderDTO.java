package com.byteriders.myantech.model.dto.output;

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
public class OrderDTO {
	
	private int id;
    private int invoice_no;
    private String shop_name;
    private String township_name;
    private String driver_name;
    private String vehicle_plate_no;
    private String order_status;
    private String delivery_status;

}
