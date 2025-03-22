package com.wedormin.wedormin_backend.repository;

import com.wedormin.wedormin_backend.model.OnCampusHousing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OnCampusHousingRepository extends JpaRepository<OnCampusHousing, Long> {

    @Query("""
        SELECT h 
        FROM OnCampusHousing h 
        WHERE (:campus IS NULL OR h.campus = :campus)
            AND (:housingType IS NULL OR h.housing_type = :housingType)
            AND (:minClassYear IS NULL OR h.min_class_year = :minClassYear)
            AND (:maxAvgLotteryNumber IS NULL OR h.avg_lottery_number <= :maxAvgLotteryNumber)
    """)
    List<OnCampusHousing> filterByOnCampusSpecificParams(
        @Param("campus") String campus,
        @Param("housingType") String housingType,
        @Param("minClassYear") String minClassYear,
        @Param("maxAvgLotteryNumber") Integer maxAvgLotteryNumber
    );
}
