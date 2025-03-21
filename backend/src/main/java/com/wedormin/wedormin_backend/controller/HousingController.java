package com.wedormin.wedormin_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wedormin.wedormin_backend.dto.HousingDTO;
import com.wedormin.wedormin_backend.dto.OffCampusHousingDTO;
import com.wedormin.wedormin_backend.dto.OnCampusHousingDTO;
import com.wedormin.wedormin_backend.service.HousingService;

import java.util.List;

@RestController
@RequestMapping("/api/housing")
public class HousingController {

    @Autowired
    private HousingService housingService;

    @GetMapping("/all")
    public List<HousingDTO> getAllHousing() {
        return housingService.getAllHousing();
    }

    @GetMapping("/oncampus")
    public List<OnCampusHousingDTO> getOnCampusHousing() {
        return housingService.getOnCampusHousing();
    }

    @GetMapping("/offcampus")
    public List<OffCampusHousingDTO> getOffCampusHousing() {
        return housingService.getOffCampusHousing();
    }
}

// Controller calls the service instead of repository