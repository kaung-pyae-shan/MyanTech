package com.byteriders.myantech.model.dto.output;

import lombok.Data;

@Data
public class ProductOrderDetails {
    private String productId;
    private String productName;
    private int quantity;
    private int unitPrice;
    private int subtotal;
    private String remark;
}
