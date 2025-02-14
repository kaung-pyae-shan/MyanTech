package com.byteriders.myantech.model.dto.output;

import java.util.List;

import lombok.Data;

@Data
public class OrderAndProductDto {
    private int id;
    private String invoiceNo;
    private String shopId;
    private String shopName;
    private String shopAddress;
    private String contact;
    private int townshipId;
    private String townshipName;
    private int regionId;
    private String regionName;
    private String orderStatus;
    private List<ProductOrderDetails> products;
}
