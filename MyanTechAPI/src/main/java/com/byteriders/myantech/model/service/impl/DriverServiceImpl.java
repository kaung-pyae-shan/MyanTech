package com.byteriders.myantech.model.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.output.DriverDTO;
import com.byteriders.myantech.model.repo.DriverRepo;
import com.byteriders.myantech.model.service.DriverService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DriverServiceImpl implements DriverService {
	
	private final DriverRepo driverRepo;
	private final ModelMapper modelMapper;

	@Override
	public List<DriverDTO> getAllDrivers() {
    return driverRepo.findAll().stream()
            .map(driver -> {
            	
            	DriverDTO driverDTO = new DriverDTO();
            	driverDTO.setDriver_id(driver.getDriverId());
            	driverDTO.setVehicle_plate_no(driver.getVehiclePlateNo());
            	driverDTO.setDriver_name(driver.getDriverName());
            	driverDTO.setContact(driver.getContact());
            	
            	return driverDTO;
            })
            .collect(Collectors.toList());
}

}
