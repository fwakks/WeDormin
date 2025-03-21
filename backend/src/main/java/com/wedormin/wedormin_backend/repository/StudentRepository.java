package com.wedormin.wedormin_backend.repository;

// import com.pgvector.PGvector;
import com.wedormin.wedormin_backend.model.Student;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query(value = """
        SELECT * FROM student 
        ORDER BY embedding <-> CAST(:vector AS vector)
        LIMIT :limit
        OFFSET 1;
    """, nativeQuery = true)
    List<Student> findSimilarStudents(@Param("vector") float[] vector, @Param("limit") int limit);

    List<Student> findByNameContainingIgnoreCase(@Param("name")String name);

    @Query("""
    SELECT s 
    FROM Student s 
    WHERE (:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%')))
    AND (:ruid IS NULL OR s.ruid = :ruid)
    AND (:age IS NULL OR s.age = :age)
    AND (:class_year IS NULL OR s.class_year = :class_year)
    AND (:gender IS NULL OR s.gender = :gender)
    """)
    List<Student> filterStudents(@Param("name") String name, 
                                @Param("ruid") Long ruid,
                                @Param("age") Integer age,
                                @Param("class_year") Integer class_year,
                                @Param("gender") String gender);

    @Query("""
        SELECT s 
        FROM Student s 
        WHERE (:minAge IS NULL OR s.age >= :minAge)
            AND (:maxAge IS NULL OR s.age <= :maxAge)
            AND (:majors IS NULL OR s.major IN :majors)
            AND (:gender IS NULL OR s.gender = :gender)
    """)
    List<Student> filterStudentsAdvanced(
        @Param("minAge") Integer minAge,
        @Param("maxAge") Integer maxAge,
        @Param("majors") List<String> majors,
        @Param("gender") String gender);
    
    @Query("""
        SELECT s 
        FROM Student s 
        WHERE (:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%')))
        """)
    List<Student> searchByName(@Param("name") String name);
}
