package com.wedormin.wedormin_backend.repository;

import com.wedormin.wedormin_backend.model.Student;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Has built-in CRUD methods
    // Add custom methods below
    // @Query(value = "SELECT * FROM student ORDER by embedding <-> :queryVector LIMIT 10",nativeQuery = true)
    // List<Student> findSimilarStudents(@Param("queryVector")float[] embedding);
    List<String> findSimilarQueries(@Param("embedding") String embedding);
    List<Student> findAll();
}
