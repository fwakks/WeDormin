package com.wedormin.wedormin_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OnCampusHousingDTO extends HousingDTO {

    private int num_rooms;
    private String min_class_year;
    private String campus;
    private Integer avg_lottery_number;
    private String housing_type;
    private boolean availability;
}
