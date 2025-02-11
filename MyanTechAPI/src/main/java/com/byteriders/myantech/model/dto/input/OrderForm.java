package com.byteriders.myantech.model.dto.input;

import java.util.List;

public record OrderForm(
    int shopId,
    List<Product> products,
    int subtotal
) {
    public record Product(int productId, int quantity, String remarks) {}
}