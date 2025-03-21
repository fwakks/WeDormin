package com.wedormin.wedormin_backend.repository;

import com.wedormin.wedormin_backend.model.OnCampusHousing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnCampusHousingRepository extends JpaRepository<OnCampusHousing, Long> {
}
