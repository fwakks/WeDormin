package com.wedormin.wedormin_backend.config;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;

@Component
public class JwtValidator {

    private final JwtDecoder jwtDecoder;

    public JwtValidator(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    public Jwt validate(String token) {
        try {
            return jwtDecoder.decode(token);
        } catch (Exception e) {
            return null;
        }
    }
}

