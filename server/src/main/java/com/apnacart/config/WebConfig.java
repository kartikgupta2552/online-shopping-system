package com.apnacart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer { // ★ implements WebMvcConfigurer directly!

    String FRONTEND_URL = "http://localhost:5173";

    /**
     * Configure "global" cross-origin request processing. The configured CORS
     * mappings apply to annotated controllers, functional endpoints, and static
     * resources.
     *
     * @param registry
     * @see CorsRegistry
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

    // ★ Add resource mapping so Spring will serve /image/product/** from your uploads folder
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static product images from uploads/images
        registry.addResourceHandler("image/product/**")
                .addResourceLocations("file:uploads/images");
    }//addResourceHandlers() ends

}//WebConfig class ends
