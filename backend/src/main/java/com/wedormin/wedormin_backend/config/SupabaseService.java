package com.wedormin.wedormin_backend.config;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Component
public class SupabaseService {
    private final String SUPABASE_URL = "https://your-supabase-url.supabase.co";
    private final String SUPABASE_KEY = "your_supabase_service_role_key";
    private final RestTemplate restTemplate = new RestTemplate();

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("apikey", SUPABASE_KEY);
        headers.set("Authorization", "Bearer " + SUPABASE_KEY);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    public Optional<Map<String, Object>> findStudentByOauthId(String oauthId) {
        String url = SUPABASE_URL + "/rest/v1/students?oauth_id=eq." + oauthId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());

        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);

        return response.getBody() != null && !response.getBody().isEmpty()
                ? Optional.of((Map<String, Object>) response.getBody().get(0))
                : Optional.empty();
    }

    public Map<String, Object> createStudent(String name, String email, String oauthId) {
        String url = SUPABASE_URL + "/rest/v1/students";
        Map<String, Object> student = new HashMap<>();
        student.put("name", name);
        student.put("email", email);
        student.put("oauth_id", oauthId);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(student, getHeaders());

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        return response.getBody();
    }
}

