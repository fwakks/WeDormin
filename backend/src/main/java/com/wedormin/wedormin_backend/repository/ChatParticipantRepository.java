package com.wedormin.wedormin_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.wedormin.wedormin_backend.model.ChatParticipant;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    @Query("SELECT cp.studentId FROM ChatParticipant cp WHERE cp.chatId = :chatId")
    List<Long> findStudentIdsByChatId(@Param("chatId") Long chatId);

    Optional<ChatParticipant> findByChatIdAndStudentId(Long chatId, Long studentId);
}