package com.byteriders.myantech.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.byteriders.myantech.model.dto.output.BrandDTO;
import com.byteriders.myantech.model.service.BrandService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class BrandCategoryController {
	
	private final BrandService brandService;
	
	@GetMapping("brands")
    public ResponseEntity<List<BrandDTO>> getAllBrands() {
        List<BrandDTO> brands = brandService.getAllBrands();
        if (brands.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(brands);
        }
    }
}
