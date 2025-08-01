package com.apnacart.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	//CSRF - cross site request forgery
	//CORS - cross origin 
	
	//spring security blocks every request by default when needed
	//using this we are temporarily allowing such requests(we are only using bcrypt for now)
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
			.csrf(csrf -> csrf.disable()) //disable the csrf for the REST APIs
			.authorizeHttpRequests(auth -> auth
					.anyRequest().permitAll()//allows all requests for now
					);
		
		return http.build();
	}

}//SecurityConfig() ends
