package com.wedormin.wedormin_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OffCampusHousingDTO extends HousingDTO {

    private Integer sq_ft;
    private boolean availability;
    private Integer time_to_campus;
}
