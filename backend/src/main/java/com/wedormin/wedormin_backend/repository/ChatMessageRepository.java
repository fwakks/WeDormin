package com.wedormin.wedormin_backend.repository;

import com.wedormin.wedormin_backend.model.ChatMessage;
import com.wedormin.wedormin_backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    // Query based on Student's ruid
    List<ChatMessage> findByStudent_Ruid(Long ruid);
}
