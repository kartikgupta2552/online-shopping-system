package com.apnacart.security;
// ⬆️ Make sure the package path matches your project structure!

import java.io.Serializable;

/**
 * A simple, serializable principal object, used as the "identity" Spring Security puts on requests
 * via your JWT filter.
 * This is what your controllers will grab for current-user logic.
 */
public class CustomPrincipal implements Serializable {
    private final Long userId;
    private final String email;

    public CustomPrincipal(Long userId, String email) {
        this.userId = userId;
        this.email = email;
    }

    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    // If you want to add roles or status later, slap them in as more fields + constructor params.
}
//CustomPrincipal ends
