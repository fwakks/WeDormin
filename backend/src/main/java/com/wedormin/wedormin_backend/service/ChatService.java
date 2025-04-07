package com.wedormin.wedormin_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wedormin.wedormin_backend.model.ChatMessage;
import com.wedormin.wedormin_backend.model.ChatParticipant;
import com.wedormin.wedormin_backend.repository.ChatMessageRepository;
import com.wedormin.wedormin_backend.repository.ChatParticipantRepository;
import com.wedormin.wedormin_backend.model.Chat;
import com.wedormin.wedormin_backend.repository.ChatRepository;
import com.wedormin.wedormin_backend.controller.ChatController;
import org.springframework.context.annotation.Lazy;

import java.util.List;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private ChatParticipantRepository chatParticipantRepository;

    @Autowired
    private ChatRepository chatRepository;

    
    @Autowired
    @Lazy
    private ChatController chatController; // Inject ChatController to notify clients

    public List<ChatMessage> getMessages(Long chatId) {
        return chatMessageRepository.findByChatId(chatId);
    }

    public ChatMessage sendMessage(Long chatId, ChatMessage message) {
        message.setChatId(chatId);
        message.setTimestamp(LocalDateTime.now()); // Ensure timestamp is set
        ChatMessage savedMessage = chatMessageRepository.save(message);

        // Notify clients about the new message
        chatController.sendMessageToClients(savedMessage);

        return savedMessage;
    }

    public List<Long> getParticipants(Long chatId) {
        return chatParticipantRepository.findStudentIdsByChatId(chatId);
    }

    public ChatParticipant addParticipant(Long chatId, Long studentId) {
        Optional<ChatParticipant> existingParticipant = chatParticipantRepository.findByChatIdAndStudentId(chatId, studentId);
        if (existingParticipant.isPresent()) {
            return existingParticipant.get(); // Participant already exists
        }

        ChatParticipant participant = new ChatParticipant();
        participant.setChatId(chatId);
        participant.setStudentId(studentId);
        participant.setJoinedAt(LocalDateTime.now());
        return chatParticipantRepository.save(participant);
    }

    public Chat createChat(String name) {
        Chat chat = new Chat();
        chat.setName(name);
        chat.setCreatedAt(LocalDateTime.now());
        chat.setUpdatedAt(LocalDateTime.now());
        return chatRepository.save(chat);
    }
}