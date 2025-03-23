package com.wedormin.wedormin_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SupabaseService {
    private final String supabaseUrl;
    private final String supabaseKey;
    private final RestTemplate restTemplate = new RestTemplate();
    
    public SupabaseService(
            @Value("${supabase.url}") String supabaseUrl,
            @Value("${supabase.service.key}") String supabaseKey) {
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
    }
    
    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("apikey", supabaseKey);
        headers.set("Authorization", "Bearer " + supabaseKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
    
    public Optional<Map<String, Object>> findStudentByOauthId(String oauthId) {
        String url = supabaseUrl + "/rest/v1/students?oauth_id=eq." + oauthId;
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);
        return response.getBody() != null && !response.getBody().isEmpty()
                ? Optional.of((Map<String, Object>) response.getBody().get(0))
                : Optional.empty();
    }
    
    public Map<String, Object> createStudent(String name, String email, String oauthId) {
        String url = supabaseUrl + "/rest/v1/students";
        Map<String, Object> student = new HashMap<>();
        student.put("name", name);
        student.put("email", email);
        student.put("oauth_id", oauthId);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(student, getHeaders());
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        return response.getBody();
    }
}