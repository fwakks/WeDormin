package com.wedormin.wedormin_backend.controller;

import com.wedormin.wedormin_backend.model.Student;

import com.wedormin.wedormin_backend.repository.StudentRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

// http://localhost:8080

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private Student student;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        return ResponseEntity.ok(studentRepository.findAll());
    }

    @GetMapping
    public ResponseEntity<List<String>> getSimilar(){
        return ResponseEntity.ok(studentRepository.findSimilarQueries(student.getEmbeddings()));
    }
}
