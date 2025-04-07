package com.wedormin.wedormin_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.wedormin.wedormin_backend.model.ChatMessage;
import com.wedormin.wedormin_backend.model.ChatParticipant;
import com.wedormin.wedormin_backend.service.ChatService;
import com.wedormin.wedormin_backend.model.Chat;
import com.wedormin.wedormin_backend.model.ParticipantRequest;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();

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

    @GetMapping("/{chatId}/stream")
    public SseEmitter streamMessages(@PathVariable Long chatId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE); // Keep the connection open indefinitely
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        return emitter;
    }

    public void sendMessageToClients(ChatMessage message) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name("message")
                        .data(message));
            } catch (Exception e) {
                emitters.remove(emitter); // Remove broken emitters
            }
        }
    }
}