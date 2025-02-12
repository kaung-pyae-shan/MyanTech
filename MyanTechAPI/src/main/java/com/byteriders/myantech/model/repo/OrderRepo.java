package com.byteriders.myantech.model.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.byteriders.myantech.model.entity.Order;
import com.byteriders.myantech.model.repo.custom.OrderRepoCustom;

public interface OrderRepo extends JpaRepository<Order, Integer>, OrderRepoCustom {

	@Query("SELECT MAX(o.invoiceNo) FROM Order o")
    Optional<Integer> findMaxInvoiceNo();
}
