package com.wedormin.wedormin_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.wedormin.wedormin_backend.repository.ChatMessageRepository;
import com.wedormin.wedormin_backend.repository.ChatRepository;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.wedormin.wedormin_backend.model.Chat;
import com.wedormin.wedormin_backend.model.ChatMessage;
import com.wedormin.wedormin_backend.model.Student;
import com.wedormin.wedormin_backend.dto.ChatMessageDTO;
import com.wedormin.wedormin_backend.repository.ChatMessageRepository;
import com.wedormin.wedormin_backend.repository.StudentRepository;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private static final Set<Long> activeUsers = ConcurrentHashMap.newKeySet();
    private static final int MAX_USERS = 6;

    
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ChatRepository chatRepository;
    
    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessage handleMessage(ChatMessageDTO messageDto) {
        // Retrieve the student by ruid (assuming you get ruid from messageDto)
        Optional<Student> studentOpt = studentRepository.findById(messageDto.getRuid());
    
        if (studentOpt.isPresent()) {
            // Retrieve the chat by chatId (assuming chatId comes from messageDto)
            Optional<Chat> chatOpt = chatRepository.findById(messageDto.getChatId());
    
            if (chatOpt.isPresent()) {
                // Create a new ChatMessage with the Student, Chat, and message content
                ChatMessage message = new ChatMessage(studentOpt.get(), chatOpt.get(), HtmlUtils.htmlEscape(messageDto.getContent()));
    
                // Save the message to the repository
                chatMessageRepository.save(message);
                return message;
            } else {
                // Handle case where chat is not found
                throw new RuntimeException("Chat not found");
            }
        } else {
            // Handle case where student is not found
            throw new RuntimeException("Student not found");
        }
    }
    

    // New API to fetch chat history
    @GetMapping("/history")
    public List<ChatMessage> getChatHistory() {
        return chatMessageRepository.findAll();
    }
}



