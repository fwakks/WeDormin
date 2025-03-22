package com.wedormin.wedormin_backend.controller;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.wedormin.wedormin_backend.repository.StudentRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    private final StudentRepository studentRepository;

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

   @GetMapping("/register")
    public ResponseEntity<Map<String,String>> showRegistrationForm(HttpSession session, Model model, Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = (String) session.getAttribute("oauth2Name");

        // Check if user already exists (shouldn’t happen due to success handler, but as a safeguard)
        if (studentRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(302).header("Location","/dashboard").build();
        }

        Map<String,String> response = new HashMap<>();
        response.put("name", name);
        response.put("email", email);
        return ResponseEntity.ok(response);
    }
}
