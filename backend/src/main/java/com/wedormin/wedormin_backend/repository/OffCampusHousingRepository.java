package com.wedormin.wedormin_backend.repository;

import com.wedormin.wedormin_backend.model.OffCampusHousing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OffCampusHousingRepository extends JpaRepository<OffCampusHousing, Long> {

    @Query("""
        SELECT h 
        FROM OffCampusHousing h 
        WHERE (:minSqFt IS NULL OR h.sq_ft >= :minSqFt)
            AND (:maxSqFt IS NULL OR h.sq_ft <= :maxSqFt)
            AND (:maxTimeToCampus IS NULL OR h.time_to_campus <= :maxTimeToCampus)
    """)
    List<OffCampusHousing> filterByOffCampusSpecificParams(
        @Param("minSqFt") Integer minSqFt,
        @Param("maxSqFt") Integer maxSqFt,
        @Param("maxTimeToCampus") Integer maxTimeToCampus
    );
}
