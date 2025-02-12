package com.byteriders.myantech.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.byteriders.myantech.model.entity.Driver;

public interface DriverRepo extends JpaRepository<Driver, Integer> {

}
