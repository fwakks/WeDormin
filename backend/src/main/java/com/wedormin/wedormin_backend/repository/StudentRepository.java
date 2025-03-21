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


    

}
