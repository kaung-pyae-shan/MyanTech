package com.byteriders.myantech.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Driver {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int driverId;
    
    private String driverName;
    private String contact;
    
    @Column(name = "vehicle_plate_no")
    private String vehiclePlateNo;
}
