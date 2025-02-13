package com.byteriders.myantech.model.repo.custom;

import java.util.List;

import com.byteriders.myantech.model.dto.input.OrderSearch;
import com.byteriders.myantech.model.dto.output.OrderDetails;

public interface OrderRepoCustom {

	List<OrderDetails> searchAllOrderDetails(OrderSearch search);
}
