package com.byteriders.myantech.model.dto.output;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
	
	private int id;
    private int invoice_no;
    private String shop_name;
    private String township_name;
    private String order_status;

}
