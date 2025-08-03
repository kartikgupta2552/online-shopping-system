package com.apnacart.controller;

import com.apnacart.dto.request.OrderRequestDto;
import com.apnacart.dto.response.OrderResponseDto;
import com.apnacart.payload.ApiResponse;
import com.apnacart.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")//for react frontend
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<OrderResponseDto>> createOrder(@Valid @RequestBody OrderRequestDto orderRequestDto){
       OrderResponseDto order =  orderService.createOrder(orderRequestDto);
       ApiResponse<OrderResponseDto> response = ApiResponse.success("Order created succesfully",order);
       return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }//createOrder() ends

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponseDto>> getOrderById(@Valid @PathVariable Long orderId){
        OrderResponseDto order = orderService.getOrderById(orderId);
        ApiResponse<OrderResponseDto> response = ApiResponse.success("Order retrieved successfully",order);
        return ResponseEntity.ok(response);
    }//getOrderById() ends

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<OrderResponseDto>>> getAllOrders(){
        List<OrderResponseDto> orders = orderService.getAllOrders();
        ApiResponse<List<OrderResponseDto>> response = ApiResponse.success("All orders retrieved successfully",orders);
        return ResponseEntity.ok(response);
    }//getAllOrders() ends

}//OrderController class ends
