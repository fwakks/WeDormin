package com.wedormin.wedormin_backend.controller;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wedormin.wedormin_backend.model.Student;
import com.wedormin.wedormin_backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;

@RestController
public class HomeController {

    private final StudentRepository studentRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    public HomeController(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }
    
    @GetMapping("/")
    public String home(){
        return "Hello home!";
    }

    @GetMapping("/secured")
    public String secured(){
        return "Hello secured";
    }

    @GetMapping("/dashboard")
    public String dashboard(){
        return "dashboard";
    }

    @GetMapping("/profile/edit")
    public String profileEdit() {
        return "profile-edit";
    }

    @GetMapping("/register")
    public ResponseEntity<?> showRegistrationForm(HttpSession session, Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String oauthId = oAuth2User.getAttribute("sub");  // Get the OAuth ID

        // Check if user already exists
        Optional<Student> existingStudent = studentRepository.findByOauthId(oauthId);
        if (existingStudent.isPresent()) {
            // User already exists, redirect to dashboard
            return ResponseEntity.status(302).header("Location", frontendUrl + "/dashboard").build();
        }

        // User doesn't exist, create a new student
        Student newStudent = new Student();
        newStudent.setName(name);
        newStudent.setEmail(email);
        newStudent.setOauthId(oauthId);
        // Set other required fields with default values if necessary
        
        // Save the new student
        studentRepository.save(newStudent);

        // Redirect to dashboard or profile completion page
        return ResponseEntity.status(302).header("Location", frontendUrl + "/dashboard").build();
    }

    @GetMapping("/api/user")
    public ResponseEntity<?> getUserDetails(@AuthenticationPrincipal OAuth2User principal) {
        String oauthId = principal.getAttribute("sub"); // Assuming 'sub' is the OAuth ID
        Optional<Student> studentOpt = studentRepository.findByOauthId(oauthId);

        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            return ResponseEntity.ok(new UserDTO(student.getRuid().toString(), student.getLottery_number()));
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    // DTO class to send user details
    public static class UserDTO {
        private String ruid;
        private Integer lotteryNumber;

        public UserDTO(String ruid, Integer lotteryNumber) {
            this.ruid = ruid;
            this.lotteryNumber = lotteryNumber;
        }

        public String getRuid() {
            return ruid;
        }

        public Integer getLotteryNumber() {
            return lotteryNumber;
        }
    }
}
