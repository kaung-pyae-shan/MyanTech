package com.byteriders.myantech.model.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.byteriders.myantech.model.dto.output.ShopInfo;
import com.byteriders.myantech.model.entity.Shop;

public interface ShopRepo extends JpaRepository<Shop, Integer> {

	@Query("""
			SELECT new com.byteriders.myantech.model.dto.output.ShopInfo(
		       s.id, s.name, s.address, t.name, r.name, s.availableStatus)
		       FROM Shop s
		       JOIN s.township t
		       JOIN s.region r
			""")
	public List<ShopInfo> getAllShopInfo();
	
	@Query("SELECT s.id from Shop s where s.name LIKE %:name%")
	public List<Integer> findIdsByNameLike(String name);
}
