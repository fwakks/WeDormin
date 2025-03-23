package com.wedormin.wedormin_backend.config;


import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Component
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final SupabaseService supabaseService;

    public CustomOAuth2SuccessHandler(SupabaseService supabaseService) {
        this.supabaseService = supabaseService;
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
            response.sendRedirect("https://your-frontend-url.com/dashboard");
        } else {
            supabaseService.createStudent(name, email, oauthId);
            response.sendRedirect("https://your-frontend-url.com/profile/edit");
        }
    }
}




