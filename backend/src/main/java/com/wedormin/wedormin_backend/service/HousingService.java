package com.wedormin.wedormin_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wedormin.wedormin_backend.repository.HousingRepository;
import com.wedormin.wedormin_backend.repository.OnCampusHousingRepository;
import com.wedormin.wedormin_backend.repository.OffCampusHousingRepository;
import com.wedormin.wedormin_backend.dto.HousingDTO;
import com.wedormin.wedormin_backend.dto.OffCampusHousingDTO;
import com.wedormin.wedormin_backend.dto.OnCampusHousingDTO;
import com.wedormin.wedormin_backend.model.Housing;
import com.wedormin.wedormin_backend.model.OnCampusHousing;
import com.wedormin.wedormin_backend.model.OffCampusHousing;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class HousingService {

    @Autowired
    private HousingRepository housingRepository;

    @Autowired
    private OnCampusHousingRepository onCampusHousingRepository;

    @Autowired
    private OffCampusHousingRepository offCampusHousingRepository;

    // Get all housing
    public List<HousingDTO> getAllHousing() {
        // Retrieve all Housing entities from the database
        List<Housing> housingList = housingRepository.findAll();
        // Convert the List<Housing> to a Stream<Housing>
        Stream<Housing> housingStream = housingList.stream();
        // Map each Housing entity to a HousingDTO using the convertToDTO method
        Stream<HousingDTO> housingDTOStream = housingStream.map(this::convertToDTO);
        // Collect the Stream<HousingDTO> into a List<HousingDTO>
        List<HousingDTO> housingDTOList = housingDTOStream.collect(Collectors.toList());
        
        return housingDTOList;
    }

    // Fetch on-campus housing
    public List<OnCampusHousingDTO> getOnCampusHousing() {
        return onCampusHousingRepository.findAll().stream()
                .map(this::convertToOnCampusDTO)
                .collect(Collectors.toList());
    }

    // Fetch off-campus housing
    public List<OffCampusHousingDTO> getOffCampusHousing() {
        return offCampusHousingRepository.findAll().stream()
                .map(this::convertToOffCampusDTO)
                .collect(Collectors.toList());
    }

    // Fetch a specific housing by ID
    public HousingDTO getHousingById(Long id) {
        Housing housing = housingRepository.findById(id).orElse(null);
        if (housing != null) {
            return convertToDTO(housing);
        }
        return null;
    }

    // Filter Housing
    public List<HousingDTO> filterAllHousing(
        // Common filters
        BigDecimal minPrice, BigDecimal maxPrice,
        Integer minResidents, Integer maxResidents,
        String locationType, Boolean availability,
        // On-campus specific filters
        String campus, String housingType, String minClassYear, Integer maxAvgLotteryNumber,
        // Off-campus specific filters
        Integer minSqFt, Integer maxSqFt, Integer maxTimeToCampus) {
    
        List<HousingDTO> results = new ArrayList<>();
        
        // Apply filters based on location type
        if (locationType == null || "on_campus".equalsIgnoreCase(locationType)) {
            // Get all on-campus housing that meets the basic criteria
            List<OnCampusHousing> onCampusHousing = onCampusHousingRepository.findAll().stream()
                .filter(h -> 
                    (minPrice == null || h.getPrice().compareTo(minPrice) >= 0) &&
                    (maxPrice == null || h.getPrice().compareTo(maxPrice) <= 0) &&
                    (minResidents == null || h.getNum_residents() >= minResidents) &&
                    (maxResidents == null || h.getNum_residents() <= maxResidents) &&
                    (availability == null || h.isAvailability() == availability) &&
                    (campus == null || campus.equals(h.getCampus())) &&
                    (housingType == null || housingType.equals(h.getHousing_type())) &&
                    (minClassYear == null || minClassYear.equals(h.getMin_class_year())) &&
                    (maxAvgLotteryNumber == null || h.getAvg_lottery_number() <= maxAvgLotteryNumber)
                )
                .collect(Collectors.toList());
                
            // Convert to DTOs and add to results
            results.addAll(onCampusHousing.stream()
                .map(this::convertToOnCampusDTO)
                .collect(Collectors.toList()));
        }
        
        if (locationType == null || "off_campus".equalsIgnoreCase(locationType)) {
            // Get all off-campus housing that meets the basic criteria
            List<OffCampusHousing> offCampusHousing = offCampusHousingRepository.findAll().stream()
                .filter(h -> 
                    (minPrice == null || h.getPrice().compareTo(minPrice) >= 0) &&
                    (maxPrice == null || h.getPrice().compareTo(maxPrice) <= 0) &&
                    (minResidents == null || h.getNum_residents() >= minResidents) &&
                    (maxResidents == null || h.getNum_residents() <= maxResidents) &&
                    (availability == null || h.isAvailability() == availability) &&
                    (minSqFt == null || h.getSq_ft() >= minSqFt) &&
                    (maxSqFt == null || h.getSq_ft() <= maxSqFt) &&
                    (maxTimeToCampus == null || h.getTime_to_campus() <= maxTimeToCampus)
                )
                .collect(Collectors.toList());
                
            // Convert to DTOs and add to results
            results.addAll(offCampusHousing.stream()
                .map(this::convertToOffCampusDTO)
                .collect(Collectors.toList()));
        }
        
        return results;
    }

    // Convert Housing entity to HousingDTO
    private HousingDTO convertToDTO(Housing housing) {
        HousingDTO dto = new HousingDTO();
        dto.setHousing_id(housing.getHousing_id());
        dto.setName(housing.getName());
        dto.setAddress(housing.getAddress());
        dto.setAmenities(housing.getAmenities());
        dto.setPrice(housing.getPrice());
        dto.setNum_residents(housing.getNum_residents());
        dto.setImage(housing.getImage());
        dto.setLocation_type(housing.getLocation_type());
        dto.setAvailability(housing.isAvailability());
        return dto;
    }

    // Convert OnCampusHousing entity to DTO
    private OnCampusHousingDTO convertToOnCampusDTO(OnCampusHousing housing) {
        OnCampusHousingDTO dto = new OnCampusHousingDTO();
        dto.setHousing_id(housing.getHousing_id());
        dto.setName(housing.getName());
        dto.setAddress(housing.getAddress());
        dto.setAmenities(housing.getAmenities());
        dto.setPrice(housing.getPrice());
        dto.setNum_residents(housing.getNum_residents());
        dto.setImage(housing.getImage());
        dto.setLocation_type(housing.getLocation_type());
        dto.setAvailability(housing.isAvailability());

        dto.setNum_rooms(housing.getNum_rooms());
        dto.setMin_class_year(housing.getMin_class_year());
        dto.setCampus(housing.getCampus());
        dto.setAvg_lottery_number(housing.getAvg_lottery_number());
        dto.setHousing_type(housing.getHousing_type());

        return dto;
    }

    // Convert OffCampusHousing entity to DTO
    private OffCampusHousingDTO convertToOffCampusDTO(OffCampusHousing housing) {
        OffCampusHousingDTO dto = new OffCampusHousingDTO();
        dto.setHousing_id(housing.getHousing_id());
        dto.setName(housing.getName());
        dto.setAddress(housing.getAddress());
        dto.setAmenities(housing.getAmenities());
        dto.setPrice(housing.getPrice());
        dto.setNum_residents(housing.getNum_residents());
        dto.setImage(housing.getImage());
        dto.setLocation_type(housing.getLocation_type());
        dto.setAvailability(housing.isAvailability());

        dto.setSq_ft(housing.getSq_ft());
        dto.setTime_to_campus(housing.getTime_to_campus());

        return dto;
    }

}

// Service layer will handle business logic, fetch data, and converts entities into DTOs