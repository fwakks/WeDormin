package com.wedormin.wedormin_backend.service;

import com.wedormin.wedormin_backend.model.ChatMessage;
import com.wedormin.wedormin_backend.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public List<ChatMessage> getMessagesByStudentRuid(Long ruid) {
        return chatMessageRepository.findByStudent_Ruid(ruid);
    }
}
