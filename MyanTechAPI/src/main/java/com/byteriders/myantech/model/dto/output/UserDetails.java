package com.byteriders.myantech.model.dto.output;

import com.byteriders.myantech.model.entity.User.Role;

import lombok.Data;

@Data
public class UserDetails {
	private int id;
	private String name;
	private Role role;
}
