package com.byteriders.myantech.model.dto.output;
import lombok.Data;

@Data
public class SaleChartDto {
    private String orderDate;
    private int totalCashSales;

    public SaleChartDto(String obj, int obj2) {
        this.orderDate = obj;
        this.totalCashSales = obj2;
    }

}
