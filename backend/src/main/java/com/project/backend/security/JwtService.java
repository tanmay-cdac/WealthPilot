package com.project.backend.security;

import io.jsonwebtoken.Jwts;
import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private final Dotenv dotenv = Dotenv.load();

    private final String SECRET = dotenv.get("JWT_SECRET");
    private final long EXPIRATION = Long.parseLong(dotenv.get("JWT_EXPIRATION"));

    private SecretKey getSigningKey() {
        byte[] keyBytes = SECRET.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email, String role) {
    return Jwts.builder()
            .subject(email)
            .claim("role", role.toUpperCase()) // ensure proper format
            .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
            .signWith(getSigningKey())
            .compact();
    }


    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    public boolean isValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
