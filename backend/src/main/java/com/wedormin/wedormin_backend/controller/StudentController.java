package com.wedormin.wedormin_backend.controller;

import com.wedormin.wedormin_backend.model.Student;
import com.wedormin.wedormin_backend.repository.StudentRepository;
import com.wedormin.wedormin_backend.service.EmbeddingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentRepository studentRepository;
    private final EmbeddingService embeddingService;

    public StudentController(StudentRepository studentRepository, EmbeddingService embeddingService) {
        this.studentRepository = studentRepository;
        this.embeddingService = embeddingService;
    }

    // Get all students
    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        List<Student> students = studentRepository.findAll();
        return ResponseEntity.ok(students);
    }

    // Create a student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student savedStudent = studentRepository.save(student); 
        savedStudent.setEmbedding(embeddingService.generateVector(savedStudent));
        savedStudent = studentRepository.findById(savedStudent.getRuid()).orElse(savedStudent); 
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }

    // Get student by id
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete student by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(student -> {
                    studentRepository.delete(student);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Get list of students similar to a student of given id
    @GetMapping("/{id}/similar/{limit}")
    public ResponseEntity<List<Student>> getSimilarStudents(@PathVariable Long id, @PathVariable int limit) {
        float[] vector = studentRepository.findById(id)
                .map(Student::getEmbedding)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return ResponseEntity.ok(studentRepository.findSimilarStudents(vector, limit));
    }

    // Get embedding vector of student by id
    @GetMapping("/{id}/vector")
    public ResponseEntity<String> getStudentVector(@PathVariable Long id) {
        float[] vector = studentRepository.findById(id)
                .map(Student::getEmbedding)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return ResponseEntity.ok(Arrays.toString(vector));
    }

    // Get students by age range, major, and gender
    @GetMapping("/filter")
    public ResponseEntity<List<Student>> compoundFilterStudents(
        @RequestParam(required = false) Integer minAge,
        @RequestParam(required = false) Integer maxAge,
        @RequestParam(required = false) List<String> majors,
        @RequestParam(required = false) String gender) {
        
        List<Student> students = studentRepository.filterStudentsAdvanced(minAge, maxAge, majors, gender);
        return ResponseEntity.ok(students);
    }

    // Get students by name
    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchByName(@RequestParam(required = false) String name) {
        List<Student> students = studentRepository.searchByName(name);
        return ResponseEntity.ok(students);
    }

}