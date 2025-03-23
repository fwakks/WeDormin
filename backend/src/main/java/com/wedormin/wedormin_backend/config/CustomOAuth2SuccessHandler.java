package com.wedormin.wedormin_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.wedormin.wedormin_backend.service.SupabaseService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Component
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final SupabaseService supabaseService;
    private final String frontendUrl;
    
    public CustomOAuth2SuccessHandler(
            SupabaseService supabaseService,
            @Value("${frontend.url}") String frontendUrl) {
        this.supabaseService = supabaseService;
        this.frontendUrl = frontendUrl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String oauthId = oAuth2User.getAttribute("sub");
        
        Optional<Map<String, Object>> existingStudent = supabaseService.findStudentByOauthId(oauthId);
        
        if (existingStudent.isPresent()) {
            response.sendRedirect(frontendUrl + "/dashboard");
        } else {
            supabaseService.createStudent(name, email, oauthId);
            response.sendRedirect(frontendUrl + "/profile/edit");
        }
    }
}




