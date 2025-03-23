package com.wedormin.wedormin_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "ruid", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "chat_id", referencedColumnName = "chat_id", nullable = false)
    private Chat chat;

    @Column(nullable = false)
    private String content;

    public ChatMessage() {}

    public ChatMessage(Student student, Chat chat, String content) {
        this.student = student;
        this.chat = chat;
        this.content = content;
    }

    public Long getId() { return id; }
    public Student getStudent() { return student; }
    public String getContent() { return content; }
    public Chat getChat() { return chat; }

    public void setId(Long id) { this.id = id; }
    public void setStudent(Student student) { this.student = student; }
    public void setContent(String content) { this.content = content; }
    public void setChat(Chat chat) { this.chat = chat; }
}






