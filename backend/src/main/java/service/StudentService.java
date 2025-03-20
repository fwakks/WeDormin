// package service;


// import org.springframework.stereotype.Service;
// import com.wedormin.wedormin_backend.repository.StudentRepository;
// import com.wedormin.wedormin_backend.repository.EmbeddingService;

// @Service
// public class StudentService {

//     private final StudentRepository studentRepository;
//     private final EmbeddingService embeddingService; // Service to generate embeddings

//     public Student saveStudent(Student student) {
//         // Generate embeddings for student profile
//         float[] embedding = embeddingService.generateEmbedding(student);
//         student.setEmbedding(embedding);
//         return studentRepository.save(student);
//     }
// }
