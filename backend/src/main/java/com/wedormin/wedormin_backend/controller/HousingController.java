package com.wedormin.wedormin_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wedormin.wedormin_backend.dto.HousingDTO;
import com.wedormin.wedormin_backend.dto.OffCampusHousingDTO;
import com.wedormin.wedormin_backend.dto.OnCampusHousingDTO;
import com.wedormin.wedormin_backend.service.HousingService;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/housing")
public class HousingController {

    @Autowired
    private HousingService housingService;

    // Get all housing
    @GetMapping("/all")
    public List<HousingDTO> getAllHousing() {
        return housingService.getAllHousing();
    }

    // Fetch on-campus housing
    @GetMapping("/oncampus")
    public List<OnCampusHousingDTO> getOnCampusHousing() {
        return housingService.getOnCampusHousing();
    }

    // Fetch off-campus housing
    @GetMapping("/offcampus")
    public List<OffCampusHousingDTO> getOffCampusHousing() {
        return housingService.getOffCampusHousing();
    }

    // Fetch a specific housing by ID
    @GetMapping("/{id}")
    public HousingDTO getHousingById(@PathVariable Long id) {
        return housingService.getHousingById(id);
    }

    // Filter housing
    @GetMapping("/filter")
    public List<HousingDTO> filterHousing(
            // Common filters
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minResidents,
            @RequestParam(required = false) Integer maxResidents,
            @RequestParam(required = false) String locationType,
            @RequestParam(required = false) Boolean availability,
            // On-campus specific filters
            @RequestParam(required = false) String campus,
            @RequestParam(required = false) String housingType,
            @RequestParam(required = false) String minClassYear,
            @RequestParam(required = false) Integer maxAvgLotteryNumber,
            // Off-campus specific filters
            @RequestParam(required = false) Integer minSqFt,
            @RequestParam(required = false) Integer maxSqFt,
            @RequestParam(required = false) Integer maxTimeToCampus) {
        
        return housingService.filterAllHousing(
            minPrice, maxPrice, minResidents, maxResidents, locationType, availability,
            campus, housingType, minClassYear, maxAvgLotteryNumber,
            minSqFt, maxSqFt, maxTimeToCampus);
    }

}   

// Controller calls the service instead of repository