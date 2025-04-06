package com.wedormin.wedormin_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wedormin.wedormin_backend.model.ChatMessage;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatId(Long chatId);
}