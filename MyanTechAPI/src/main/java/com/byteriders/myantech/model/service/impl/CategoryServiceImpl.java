package com.byteriders.myantech.model.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.byteriders.myantech.model.dto.output.CategoryDTO;
import com.byteriders.myantech.model.repo.CategoryRepo;
import com.byteriders.myantech.model.service.CategoryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepo;
    private final ModelMapper modelMapper;
    
    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepo.findAll().stream()
                .map(category -> {
                	
                	CategoryDTO categoryDTO = new CategoryDTO();
                	categoryDTO.setCategory_id(category.getId());
                	categoryDTO.setCategory_name(category.getName());
                	return categoryDTO;
                })
                .collect(Collectors.toList());
    }

	


    
    
}