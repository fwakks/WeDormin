package com.wedormin.wedormin_backend.controller;

import com.wedormin.wedormin_backend.model.ChatMessage;

import com.wedormin.wedormin_backend.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ChatMessageController {

    @Autowired
    private ChatMessageService chatMessageService;

    @GetMapping("/messagesByStudentRuid")
    public List<ChatMessage> getMessagesByStudentRuid(@RequestParam Long ruid) {
        return chatMessageService.getMessagesByStudentRuid(ruid);
    }
}

