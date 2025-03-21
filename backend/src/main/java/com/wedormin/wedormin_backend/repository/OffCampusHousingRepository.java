package com.wedormin.wedormin_backend.repository;

import com.wedormin.wedormin_backend.model.OffCampusHousing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OffCampusHousingRepository extends JpaRepository<OffCampusHousing, Long> {
}
