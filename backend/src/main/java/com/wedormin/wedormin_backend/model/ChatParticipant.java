package com.wedormin.wedormin_backend.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "chat_participants", uniqueConstraints = @UniqueConstraint(columnNames = {"chat_id", "user_id"}))
public class ChatParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Student user;

    @Column(nullable = false, updatable = false)
    private Instant joinedAt = Instant.now();

    // Constructors
    public ChatParticipant() {}

    public ChatParticipant(Chat chat, Student user) {
        this.chat = chat;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Chat getChat() { return chat; }
    public void setChat(Chat chat) { this.chat = chat; }

    public Student getUser() { return user; }
    public void setUser(Student user) { this.user = user; }

    public Instant getJoinedAt() { return joinedAt; }
    public void setJoinedAt(Instant joinedAt) { this.joinedAt = joinedAt; }
}

