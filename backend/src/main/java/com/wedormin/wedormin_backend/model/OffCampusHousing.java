package com.wedormin.wedormin_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "off_campus")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OffCampusHousing extends Housing {

    private Integer sq_ft;
    private Integer time_to_campus;
    
}
