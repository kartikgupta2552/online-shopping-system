package com.apnacart.config;

import jakarta.validation.valueextraction.Unwrapping;
import org.modelmapper.Condition;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {
    @Bean
    ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setPropertyCondition(Conditions.isNotNull());
        return  modelMapper;
    }//modelMapper() ends

    //for dotnet api integration
    @Bean
    public RestTemplate restTemplate(){
            return new RestTemplate();
    }//restTemplate() ends

}//AppConfig class ends
