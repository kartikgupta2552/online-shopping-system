package com.apnacart.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor // constructor injection via lombok (only final fields or @NonNull fields)
public class SecurityConfig {
    //CSRF - cross site request forgery
    //CORS - cross origin

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    //spring security blocks every request by default when needed
    //using this we are temporarily allowing such requests(we are only using bcrypt for now)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //enable cors
                .cors(Customizer.withDefaults())
                //disable csrf -> not required for stateless JWT apis
                .csrf(csrf -> csrf.disable())
                //configure session management(stateless for jwt)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //no server side sessions
                ) // all user info comes from token not from server memory
                // no session storage means easy horizontal scaling
                //confifure endpoint authorization rules
                .authorizeHttpRequests(auth -> auth
                        // public endpoints(no authentication required)
                        //login and registration
                        .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                        // Browsing category/subcategory
                        .requestMatchers(HttpMethod.GET, "/category/**", "/subcategory/**").permitAll()
                        // Allow public images (optional)
                        .requestMatchers("/image/product/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/product", "/product/**").permitAll() // 👈 Allow GET to products for everyone
                        // --- Admin ONLY endpoints ---
                        .requestMatchers(
                                HttpMethod.POST, "/category/**", "/subcategory/**"
                        ).hasRole("ADMIN")
                        .requestMatchers(
                                HttpMethod.PUT, "/category/**", "/subcategory/**"
                        ).hasRole("ADMIN")
                        .requestMatchers(
                                HttpMethod.DELETE, "/category/**", "/subcategory/**"
                        ).hasRole("ADMIN")
                        // User admin actions (patch role/status, user delete, get all users)
                        .requestMatchers(
                                HttpMethod.PATCH, "/api/users/*/status", "/api/users/*/role"
                        ).hasRole("ADMIN")
                        .requestMatchers(
                                HttpMethod.GET, "/api/users/all", "/api/users/status/**"
                        ).hasRole("ADMIN")
                        .requestMatchers(
                                HttpMethod.DELETE, "/api/users/*/soft-delete", "/api/users/*/hard-delete"
                        ).hasRole("ADMIN")
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll() // swagger documentation
                        .requestMatchers("/error").permitAll() // error pages
                        // every other endpoints will be protected -> JWT authentication required
                        // --- User actions (require login) ---
                        .requestMatchers("/api/users/**").authenticated()
                        .requestMatchers("/api/orders/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/orders/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/orders/**").authenticated()
                        .anyRequest().authenticated()
                )
                // add our JWT filter BEFORE the default username/password filter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}//SecurityConfig() ends
