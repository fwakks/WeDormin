package com.wedormin.wedormin_backend.repository;

import com.wedormin.wedormin_backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // Has built-in CRUD methods
    // Add custom methods below
}
