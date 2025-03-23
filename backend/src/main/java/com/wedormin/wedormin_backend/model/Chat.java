package com.wedormin.wedormin_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chats")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long chatId;

    @Column(nullable = false)
    private String name;

    public Chat() {}

    public Chat(String name) {
        this.name = name;
    }

    public Long getChatId() { return chatId; }
    public String getName() { return name; }

    public void setChatId(Long chatId) { this.chatId = chatId; }
    public void setName(String name) { this.name = name; }
}



