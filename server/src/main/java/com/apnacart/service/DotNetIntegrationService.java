package com.apnacart.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@AllArgsConstructor
@Service
public class DotNetIntegrationService {

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

}//DotNetIntegrationService ends
