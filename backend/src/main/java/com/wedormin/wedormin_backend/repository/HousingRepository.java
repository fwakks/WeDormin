package com.wedormin.wedormin_backend.repository;

import com.wedormin.wedormin_backend.model.Housing;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface HousingRepository extends JpaRepository<Housing, Long> {

    @Query("""
        SELECT h 
        FROM Housing h 
        WHERE (:minPrice IS NULL OR h.price >= :minPrice)
            AND (:maxPrice IS NULL OR h.price <= :maxPrice)
            AND (:minResidents IS NULL OR h.num_residents >= :minResidents)
            AND (:maxResidents IS NULL OR h.num_residents <= :maxResidents)
            AND (:location_type IS NULL OR h.location_type = :location_type)
            AND (:availability IS NULL OR h.availability = :availability)
    """)
    List<Housing> filterHousing(
        @Param("minPrice") BigDecimal minPrice,
        @Param("maxPrice") BigDecimal maxPrice,
        @Param("minResidents") Integer minResidents,
        @Param("maxResidents") Integer maxResidents,
        @Param("location_type") String location_type,
        @Param("availability") Boolean availability
    );
}
