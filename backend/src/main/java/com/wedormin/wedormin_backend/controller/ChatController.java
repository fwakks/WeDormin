package com.wedormin.wedormin_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wedormin.wedormin_backend.model.ChatMessage;
import com.wedormin.wedormin_backend.model.ChatParticipant;
import com.wedormin.wedormin_backend.service.ChatService;
import com.wedormin.wedormin_backend.model.Chat;
import com.wedormin.wedormin_backend.model.ParticipantRequest;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/{chatId}/messages")
    public List<ChatMessage> getMessages(@PathVariable Long chatId) {
        return chatService.getMessages(chatId);
    }

    @PostMapping("/{chatId}/messages")
    public ChatMessage sendMessage(@PathVariable Long chatId, @RequestBody ChatMessage message) {
        return chatService.sendMessage(chatId, message);
    }

    @GetMapping("/{chatId}/participants")
    public List<Long> getParticipants(@PathVariable Long chatId) {
        return chatService.getParticipants(chatId);
    }

    @PostMapping("/{chatId}/participants")
    public ChatParticipant addParticipant(@PathVariable Long chatId, @RequestBody ParticipantRequest participantRequest) {
        return chatService.addParticipant(chatId, participantRequest.getStudentId());
    }

    @PostMapping
    public Chat createChat(@RequestBody String name) {
        return chatService.createChat(name);
    }
}