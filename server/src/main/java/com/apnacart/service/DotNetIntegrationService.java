package com.apnacart.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@AllArgsConstructor
@Service
public class DotNetIntegrationService {

    @Data
    public static class Recommendation{
        private String productId;
        private String name;
    }//Recommendation class ends

    @Autowired
    private final RestTemplate restTemplate;

    //call dotnet health api
    public String checkDotNetApiHealth(){
        String url="http://localhost:5014/health";
        return  restTemplate.getForObject(url,String.class);
    }//checkDotNetApiHealth() ends

    //call dotnet greeting api
    public String getDotNetGreeting(String user){
        String url = "http://localhost:5014/greet?user=" + URLEncoder.encode(user, StandardCharsets.UTF_8);
        return restTemplate.getForObject(url, String.class);
    }//getDotNetGreeting() ends

    public Recommendation[] getDotNetRecommendations(String productId){
        String url = "http://localhost:5014/recommendations?productId=" + URLEncoder.encode(productId,StandardCharsets.UTF_8);
        return restTemplate.getForObject(url, Recommendation[].class);
    }//getDotNetRecommendations() ends

}//DotNetIntegrationService ends
