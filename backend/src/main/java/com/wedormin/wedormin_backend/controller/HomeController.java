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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@RestController
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

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

    @GetMapping ("/register-student")
    public ResponseEntity<Student> getOauth(HttpSession session, Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String oauthId = oAuth2User.getAttribute("sub");  // Get the OAuth ID
        System.out.println("WAAA " + email + " " + name + " " + oauthId);
        
        // User doesn't exist, create a new student
        Student newStudent = new Student();
        newStudent.setName(name);
        newStudent.setEmail(email);
        newStudent.setOauthId(oauthId);
       
        return ResponseEntity.ok(newStudent);
    }

    @GetMapping("/register")
    public ResponseEntity<?> showRegistrationForm(HttpSession session, Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String oauthId = oAuth2User.getAttribute("sub");  // Get the OAuth ID
        String googleProfileImage = oAuth2User.getAttribute("picture");
        System.out.println("Saving student with image: " + googleProfileImage);

        logger.info("OAuth Login - Name: {}, Email: {}, OAuth ID: {}, Profile Image: {}", 
                     name, email, oauthId, googleProfileImage);

        // Check if user already exists
        Optional<Student> existingStudent = studentRepository.findByOauthId(oauthId);
        if (existingStudent.isPresent()) {
            logger.info("User already exists: {}", existingStudent.get().getEmail());
            return ResponseEntity.status(302).header("Location", frontendUrl + "/dashboard").build();
        }

        // User doesn't exist, create a new student
        Student newStudent = new Student();
        newStudent.setName(name);
        newStudent.setEmail(email);
        newStudent.setOauthId(oauthId);
        newStudent.setImage(googleProfileImage);

        // Debugging: Log the new student details before saving
        logger.info("Saving new user: {}", newStudent);

        // Save the new student
        studentRepository.save(newStudent);

        logger.info("New user registered successfully with image: {}", newStudent.getImage());

        // Redirect to dashboard or profile completion page
        return ResponseEntity.ok(newStudent);
    }

    @GetMapping("/api/user")
    public ResponseEntity<?> getUserDetails(@AuthenticationPrincipal OAuth2User principal) {
        String oauthId = principal.getAttribute("sub"); // Assuming 'sub' is the OAuth ID
        Optional<Student> studentOpt = studentRepository.findByOauthId(oauthId);

        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            return ResponseEntity.ok(new UserDTO(
                student.getRuid(), 
                student.getName(), 
                student.getEmail(), 
                student.getLottery_number(), 
                student.getImage()));
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    // DTO class to send user details
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserDTO {
        private Long ruid;
        private String name;
        private String email;
        private Integer lotteryNumber;
        private String image;
    }
}
