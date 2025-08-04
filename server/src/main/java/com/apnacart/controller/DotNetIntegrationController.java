package com.apnacart.controller;

import com.apnacart.payload.ApiResponse;
import com.apnacart.service.DotNetIntegrationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/integration")
public class DotNetIntegrationController {

    private final DotNetIntegrationService dotNetIntegrationService;

//    @Autowired
//    public DotNetIntegrationController (DotNetIntegrationService service){
//        this.dotNetIntegrationService = service;
//    }

    //=============================================================================================================
    //dotnet apis

    @GetMapping("/dotnet-health")
    public ResponseEntity<ApiResponse<String>> getDotNetHealth(){
        String health = dotNetIntegrationService.checkDotNetApiHealth();
        ApiResponse<String> response = ApiResponse.success("dotnet server running successfully!",health);
        return  ResponseEntity.ok(response);
    }//getDotNetHealth() ends

    @GetMapping("/dotnet-greet")
    public ResponseEntity<ApiResponse<String>> getDotNetGreet(@RequestParam String user){
        String greeting = dotNetIntegrationService.getDotNetGreeting(user);
        ApiResponse<String> response = ApiResponse.success("Greeted successfully.",greeting);
        return ResponseEntity.ok(response);
    }//getDotNetGreet() ends

    @GetMapping("/recommendations")
    public ResponseEntity<ApiResponse<DotNetIntegrationService.Recommendation[]>> getDotNetRecommendations(@RequestParam String productId) {
        DotNetIntegrationService.Recommendation[] recs = dotNetIntegrationService.getDotNetRecommendations(productId);
        ApiResponse<DotNetIntegrationService.Recommendation[]> response = ApiResponse.success("recommendations retrieved successfully",recs);
        return ResponseEntity.ok(response);
    }//getDotNetRecommendations() ends

}//DotNetIntegrationController class ends
