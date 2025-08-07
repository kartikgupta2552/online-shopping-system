package com.apnacart.config;

import java.io.IOException;
import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.apnacart.exception.AccountInactiveException;
import com.apnacart.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor //lombok constructor injection
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtUtil jwtUtil;


    @Override
    protected void doFilterInternal(  //this is the main method that Spring calls for every HTTP request
                                      //@NonNull = parameters can never be null
                                      @NonNull HttpServletRequest request,  // contains all request data(headers, body, url etc)
                                      @NonNull HttpServletResponse response, //used to send response back to the client
                                      @NonNull FilterChain filterChain) // chain of filters that can be run after this one
            throws ServletException, IOException {

        // 1. extract authorization header from request
        String authHeader = request.getHeader("Authorization"); // if header doesn't exist then it will return null

        // 2. check if the header exists and if yes then starts with "Bearer"
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            //since no token provided, let the request continue(might be a public endpoint request)
            filterChain.doFilter(request, response);
            return; //early exit - no authorization needed
        }

        // 3. extract the actual JWT token(remove the prefix "Bearer")
        String jwtToken = authHeader.substring(7); //"Bearer ".length() = 7

        // 4. token validation logic
        try {
            // 5. validate token and extract user information
            String email = jwtUtil.getEmailFromToken(jwtToken);
            Long userId = jwtUtil.getUserIdFromToken(jwtToken);
            String userRole = jwtUtil.getUserRoleFromToken(jwtToken);
            String userStatus = jwtUtil.getUserStatusFromToken(jwtToken);

            // 6. check if user is still active(security)
            if (!"ACTIVE".equals(userStatus)) {
                //realtime security -> no waiting for token expiration
                //if the user status has changed(eg. user is blocked) since the token was issued then reject the request
                throw new AccountInactiveException("this account is not active!");
            }

            // 7. set up spring security authentication context
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                //SecurityContextHolder.getContext().getAuthentication() == null -> no authentication is already set
                // create authentication token with user details
                // Map userRole ("ADMIN", "CUSTOMER") -> "ROLE_ADMIN", "ROLE_CUSTOMER"
                List<SimpleGrantedAuthority> authorities = List.of(
                        new SimpleGrantedAuthority("ROLE_" + userRole)
                );

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        authorities
                );
                // 8. Add request details to the authentication -> (IP address, session ID, etc)
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 9. set the authentication in spring security context
                // sets the user as authenticated for this request
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        } catch (Exception e) {
            // token is invalid, expired or user is not active
            // clear any existing authentication and continue
            SecurityContextHolder.clearContext();
        }

        //continue the filter chain
        filterChain.doFilter(request, response);

    }//doFilterInternal() ends


}//JwtAuthenticationFilter ends
