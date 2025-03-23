package com.wedormin.wedormin_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");  // Messages will be sent to /topic/{destination}
        config.setApplicationDestinationPrefixes("/app"); // Clients should send messages to /app/{destination}
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat") // WebSocket/STOMP endpoint
                .setAllowedOrigins("*"); // Adjust this in production for security
                // .withSockJS();  // Uncomment if you want fallback for non-WebSocket clients
    }
}




