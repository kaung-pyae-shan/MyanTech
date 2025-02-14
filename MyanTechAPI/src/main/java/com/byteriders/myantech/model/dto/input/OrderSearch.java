package com.byteriders.myantech.model.dto.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.entity.Order.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record OrderSearch(
		String invoiceNo,
		String shopName,
		String orderStatus
		) {

	public Predicate where(CriteriaBuilder cb, Root<Order> root) {
		
		var params = new ArrayList<Predicate>();
		
		// Accept invoiceNo as String and convert it to integer when searching
		if (invoiceNo != null) {
            try {
                var invoiceNumber = Integer.parseInt(invoiceNo);
                params.add(cb.equal(root.get("invoiceNo"), invoiceNumber));
            } catch (NumberFormatException e) {
            	System.out.println("Caught an exception: " + e.getMessage());
            }
        }
		if(StringUtils.hasLength(shopName)) {
			params.add(cb.like(cb.lower(root.get("shop").get("name")), "%" + shopName.toLowerCase() + "%"));
		}
		if (StringUtils.hasLength(orderStatus) && enumCheck(orderStatus, Status.class)) {
            params.add(cb.equal(root.get("status"), Status.valueOf(orderStatus.toUpperCase())));
        }
		if(params.isEmpty()) {
			return cb.conjunction();
		}
		return cb.or(params.toArray(size -> new Predicate[size]));
	}
	
	private <E extends Enum<E>> boolean enumCheck(String value, Class<E> enumClass) {
        try {
            Enum.valueOf(enumClass, value.toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

}
