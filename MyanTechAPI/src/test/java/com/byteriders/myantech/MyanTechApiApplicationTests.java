package com.byteriders.myantech;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.byteriders.myantech.model.service.OrderService;

@SpringBootTest
class MyanTechApiApplicationTests {
	@Autowired
	private OrderService service;
	
	@Test
	void contextLoads() {
		LocalDate today = LocalDate.now();
		int result = service.getTodayOrders(today);
		System.out.println("result: " +  result);
	    assertNotNull(result); // Check if result is not null
	}

}