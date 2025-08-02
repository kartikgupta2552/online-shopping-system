package com.apnacart.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI customOpenAPI() {
		
		return new OpenAPI()
				.info(new Info()
						.title("ApnaCart Online Shopping System API")
						.description("REST API for ApnaCart - an online shopping platform built using spring boot")
						.version("1.0.0")
						.contact(new Contact()
								.name("Tushar Kartik Akanksha : github - ")
								.url("https://github.com/kartikgupta2552/online-shopping-system-BE"))
						)
				.servers(List.of(
						new Server()
							.url("http://localhost:8080")
							.description("development server")
						));
							
		
	}//customOpenAPI() ends
	
}//SwaggerConfig ends
