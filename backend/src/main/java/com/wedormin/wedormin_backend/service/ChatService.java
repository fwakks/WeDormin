package com.wedormin.wedormin_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wedormin.wedormin_backend.model.ChatMessage;
import com.wedormin.wedormin_backend.model.ChatParticipant;
import com.wedormin.wedormin_backend.repository.ChatMessageRepository;
import com.wedormin.wedormin_backend.repository.ChatParticipantRepository;
import com.wedormin.wedormin_backend.model.Chat;
import com.wedormin.wedormin_backend.repository.ChatRepository;

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

    public List<ChatMessage> getMessages(Long chatId) {
        return chatMessageRepository.findByChatId(chatId);
    }

    public ChatMessage sendMessage(Long chatId, ChatMessage message) {
        message.setChatId(chatId);
        message.setTimestamp(LocalDateTime.now()); // Ensure timestamp is set
        return chatMessageRepository.save(message);
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