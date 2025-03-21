package com.wedormin.wedormin_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class HousingDTO {

    private Long housing_id;
    private String name;
    private String address;
    private String amenities;
    private BigDecimal price;
    private int num_residents;
    private String image;
    private String location_type;

}

// Use DTOs to avoid exposing full entity objects