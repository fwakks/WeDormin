package com.wedormin.wedormin_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OnCampusHousingClassifiedDTO extends OnCampusHousingDTO {
    private String chanceClassification; // low, medium, or high
}
