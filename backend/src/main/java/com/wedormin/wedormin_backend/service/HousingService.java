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