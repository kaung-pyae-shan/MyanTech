package com.byteriders.myantech.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.output.BrandDTO;
import com.byteriders.myantech.model.dto.output.CategoryDTO;
import com.byteriders.myantech.model.dto.output.DriverDTO;
import com.byteriders.myantech.model.service.BrandService;
import com.byteriders.myantech.model.service.CategoryService;
import com.byteriders.myantech.model.service.DriverService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class CommonController {
	
	private final BrandService brandService;
	private final CategoryService categoryService;
	private final DriverService driverService;
	
	@GetMapping("brands")
    public ResponseEntity<List<BrandDTO>> getAllBrands() {
        List<BrandDTO> brands = brandService.getAllBrands();
        if (brands.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(brands);
        }
    }
	
	@GetMapping("categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(categories);
        }
    }
	
	@GetMapping("drivers")
    public ResponseEntity<List<DriverDTO>> getAllDrivers() {
        List<DriverDTO> drivers = driverService.getAllDrivers();
        if (drivers.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(drivers);
        }
    }
}
