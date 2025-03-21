package com.wedormin.wedormin_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "on_campus")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OnCampusHousing extends Housing {

    private int num_rooms;
    private String min_class_year;
    private String campus;
    private Integer avg_lottery_number;
    private String housing_type;
    private boolean availability;

}
