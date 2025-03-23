package com.wedormin.wedormin_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.wedormin.wedormin_backend.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    Optional<Chat> findById(Long chatId);
}

