package com.wedormin.wedormin_backend.config;

import java.util.Optional;

import com.wedormin.wedormin_backend.model.Student;
import com.wedormin.wedormin_backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@Component
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private StudentRepository studentRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                       Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String oauthId = oAuth2User.getAttribute("sub"); // Google's unique identifier
        
        Optional<Student> existingStudent = studentRepository.findByOauthId(oauthId);
        
        if (existingStudent.isPresent()) {
            // User exists - redirect to dashboard or appropriate page
            getRedirectStrategy().sendRedirect(request, response, frontendUrl + "/dashboard");
        } else {
            getRedirectStrategy().sendRedirect(request, response, frontendUrl + "/register");
        }
    }
}

