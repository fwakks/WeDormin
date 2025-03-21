package com.wedormin.wedormin_backend.controller;

import com.wedormin.wedormin_backend.repository.StudentRepository;

import com.wedormin.wedormin_backend.model.Student;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    

    private final StudentRepository studentRepository;

    public SearchController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<Student>> getStudentsBySimilarName(@PathVariable String name){
        return ResponseEntity.ok(studentRepository.findByNameContainingIgnoreCase(name));
    }

    @GetMapping("/students/filter")
    public ResponseEntity<List<Student>> filterStudents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long ruid,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) Integer class_year,
            @RequestParam(required = false) String gender) {

        List<Student> students  = studentRepository.filterStudents(name, ruid, age, class_year, gender);
        return ResponseEntity.ok(students);
}



}
