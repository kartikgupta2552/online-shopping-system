package com.apnacart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig {
    String FRONTEND_URL = "http://localhost:5173";

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            /**
             * Configure "global" cross-origin request processing. The configured CORS
             * mappings apply to annotated controllers, functional endpoints, and static
             * resources.
             * <p>Annotated controllers can further declare more fine-grained config via
             * {@link CrossOrigin @CrossOrigin}.
             * In such cases "global" CORS configuration declared here is
             * {@link CorsConfiguration#combine(CorsConfiguration) combined}
             * with local CORS configuration defined on a controller method.
             *
             * @param registry
             * @see CorsRegistry
             * @see CorsConfiguration#combine(CorsConfiguration)
             * @since 4.2
             */
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") //indicates all the endpoints
                        .allowedOrigins(FRONTEND_URL) //only allow from this url
                        .allowedMethods("GET","POST","PUT","DELETE","PATCH","OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // lets cookies and authorization headers through if we use them(we are using JWT)
            }//addCorsMappings() ends
        };//WebMvcConfigurer() ends
    }//corsConfigurer() ends

}//WebConfig class ends
