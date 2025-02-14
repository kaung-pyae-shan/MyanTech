package com.byteriders.myantech.model.dto.output;

<<<<<<< HEAD
import com.byteriders.myantech.model.entity.ProductOrder;
import com.byteriders.myantech.model.entity.ProductOrder.Status;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record ProductOrderDetails(
		int productOrderid,
        String productName,
        int qty,
        int unitPrice,
        int subTotal,
        String remark,
        Status status
		) {

	public static void select(CriteriaQuery<ProductOrderDetails> cq, Root<ProductOrder> root) {
        cq.multiselect(
            root.get("product").get("id"),
            root.get("product").get("name"),
            root.get("qty"),
            root.get("product").get("price"),
            root.get("subTotal"),
            root.get("remark"),
            root.get("status")
        );
    }
=======
import lombok.Data;

@Data
public class ProductOrderDetails {
    private String productId;
    private String productName;
    private int quantity;
    private int unitPrice;
    private int subtotal;
    private String remark;
>>>>>>> refs/heads/Dashboard
}
