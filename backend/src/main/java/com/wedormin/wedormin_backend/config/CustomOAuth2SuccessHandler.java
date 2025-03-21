package com.wedormin.wedormin_backend.config;

import com.wedormin.wedormin_backend.repository.StudentRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final StudentRepository studentRepository;

    public CustomOAuth2SuccessHandler(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        if (studentRepository.findByEmail(email).isPresent()) {
            response.sendRedirect("/main");
        } else {
            HttpSession session = request.getSession();
            session.setAttribute("oauth2Name", name);
            response.sendRedirect("/register");
        }
    }
}