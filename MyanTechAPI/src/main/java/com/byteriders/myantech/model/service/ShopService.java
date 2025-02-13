package com.byteriders.myantech.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.repo.ShopRepo;

@Service
public class ShopService {

	@Autowired
	private ShopRepo repo;
	
	public List<Integer> getShopIdsByName(String name) {
		return repo.findIdsByNameLike(name);
	}
}
