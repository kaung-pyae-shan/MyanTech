package com.byteriders.myantech.model.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.output.BrandDTO;
import com.byteriders.myantech.model.repo.BrandRepo;
import com.byteriders.myantech.model.service.BrandService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandServiceImpl implements BrandService {

	private final BrandRepo brandRepo;
	private final ModelMapper modelMapper;
	
	
//	@Override
//    public Response getAllBrands() {
//        // Get all brands
//		List<Brand> brands= brandRepo.findAll();
//
//        // Convert the entities to DTOs
//        List<BrandDTO> brandDTO= modelMapper.map(brands, new TypeToken<List<BrandDTO>>() {}.getType());
//
//        return Response.builder().status(200).message("Brands fetched successfully.").brands(brandDTO).build();
//    }
	
	@Override
    public List<BrandDTO> getAllBrands() {
        return brandRepo.findAll().stream()
                .map(brand -> {
                    BrandDTO brandDTO = new BrandDTO();
                    brandDTO.setBrand_id(brand.getId());
                    brandDTO.setBrand_name(brand.getName());
                    return brandDTO;
                })
                .collect(Collectors.toList());
    }


}
