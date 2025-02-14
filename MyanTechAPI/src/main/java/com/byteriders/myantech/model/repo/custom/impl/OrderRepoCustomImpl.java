package com.byteriders.myantech.model.repo.custom.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.byteriders.myantech.model.dto.input.OrderSearch;
import com.byteriders.myantech.model.dto.output.OrderDetails;
import com.byteriders.myantech.model.dto.output.ProductOrderDetails;
import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.entity.ProductOrder;
import com.byteriders.myantech.model.repo.custom.OrderRepoCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class OrderRepoCustomImpl implements OrderRepoCustom {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<OrderDetails> searchAllOrderDetails(OrderSearch search) {
		
		System.out.println(search);

		var cb = em.getCriteriaBuilder();
		var cq = cb.createQuery(OrderDetails.class);
		var root = cq.from(Order.class);
		
		OrderDetails.select(cq, root);
		
		if(null != search) {
			cq.where(search.where(cb, root));
		}
		
		List<OrderDetails> orderDetailsList = em.createQuery(cq).getResultList();
		
		// Fetch ProductOrder details and map them
        for (OrderDetails orderDetails : orderDetailsList) {
            var poCq = cb.createQuery(ProductOrderDetails.class);
            var poRoot = poCq.from(ProductOrder.class);
            
            ProductOrderDetails.select(poCq, poRoot);
            poCq.where(cb.equal(poRoot.get("order").get("id"), orderDetails.getOrderId()));
            
            List<ProductOrderDetails> productOrderDetailsList = em.createQuery(poCq).getResultList();
            
            orderDetails.setProducts(productOrderDetailsList);
        }
		
		return orderDetailsList;
	}

}
