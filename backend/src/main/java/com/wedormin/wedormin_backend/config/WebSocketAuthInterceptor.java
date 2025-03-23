package com.wedormin.wedormin_backend.config;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

@Component
public class WebSocketAuthInterceptor implements HandshakeInterceptor {

    private final JwtDecoder jwtDecoder;

    public WebSocketAuthInterceptor(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {

        // Extract "Authorization" header
        List<String> authHeaders = request.getHeaders().get("Authorization");
        if (authHeaders == null || authHeaders.isEmpty()) {
            return false; // Reject connection if no token provided
        }

        String token = authHeaders.get(0).replace("Bearer ", "");

        try {
            // Validate the token
            Jwt decodedToken = jwtDecoder.decode(token);
            String oauthId = decodedToken.getClaim("sub");

            // Attach the user ID to the WebSocket session attributes
            attributes.put("oauthId", oauthId);
            return true; // Accept connection

        } catch (Exception e) {
            return false; // Reject if invalid token
        }
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
        // No-op
    }
}
