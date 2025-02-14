package com.byteriders.myantech.model.dto.output;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TotalProductsByCategoryDto {
	
	private int category_id;
	private String category_name;
	private Long totalProduct;

}
