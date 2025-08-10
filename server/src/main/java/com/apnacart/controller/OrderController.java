package com.apnacart.controller;

import com.apnacart.dto.request.OrderRequestDto;
import com.apnacart.dto.response.OrderResponseDto;
import com.apnacart.entity.OrderStatus;
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
@CrossOrigin(origins = "http://localhost:5173")//for react frontend
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

    @DeleteMapping("/{orderId}/cancel")
    public ResponseEntity<ApiResponse<String>> cancelOrder(@PathVariable Long orderId){
        orderService.cancelOrder(orderId);
        ApiResponse<String> response = ApiResponse.success("Order cancelled successfully!",null);
        return ResponseEntity.ok(response);
    }//cancelOrder() ends

    //delete order
    @DeleteMapping("/{orderId}/delete")
    public ResponseEntity<ApiResponse<String>> deleteOrder(@PathVariable Long orderId){
        orderService.deleteOrder(orderId);
        ApiResponse<String> response = ApiResponse.success("Order deleted successfully!",null);
        return ResponseEntity.ok(response);
    }//deleteOrder() ends

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<ApiResponse<OrderResponseDto>> changeOrderStatus(
            @PathVariable Long orderId,
            @RequestParam OrderStatus status
            ){
        OrderResponseDto order = orderService.changeOrderStatus(orderId,status);
        ApiResponse<OrderResponseDto> response = ApiResponse.success("Status changed to " + status + "successfully!",order);
        return ResponseEntity.ok(response);
    }//changeOrderStatus() ends

}//OrderController class ends
