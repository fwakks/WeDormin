package com.wedormin.wedormin_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wedormin.wedormin_backend.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}