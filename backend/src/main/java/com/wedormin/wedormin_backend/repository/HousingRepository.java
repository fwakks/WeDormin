package com.wedormin.wedormin_backend.repository;

import com.wedormin.wedormin_backend.model.Housing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HousingRepository extends JpaRepository<Housing, Long> {
}
