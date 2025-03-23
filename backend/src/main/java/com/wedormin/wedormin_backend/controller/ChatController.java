package com.wedormin.wedormin_backend.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

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

    // Send a message
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, Object> messageData) {
        String chatId = (String) messageData.get("chat_id");
        String senderId = (String) messageData.get("sender_id");
        String content = (String) messageData.get("content");

        Map<String, Object> message = new HashMap<>();
        message.put("chat_id", chatId);
        message.put("sender_id", senderId);
        message.put("content", content);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(message, getHeaders());

        ResponseEntity<String> response = restTemplate.exchange(
                SUPABASE_URL + "/rest/v1/messages",
                HttpMethod.POST,
                entity,
                String.class
        );

        return ResponseEntity.ok(response.getBody());
    }

    // Get messages for a chat
    @GetMapping("/{chatId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable String chatId) {
        String url = SUPABASE_URL + "/rest/v1/messages?chat_id=eq." + chatId + "&order=sent_at.asc";
        HttpEntity<String> entity = new HttpEntity<>(getHeaders());

        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);

        return ResponseEntity.ok(response.getBody());
    }
}




