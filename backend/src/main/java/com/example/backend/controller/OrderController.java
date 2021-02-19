package com.example.backend.controller;

import com.example.backend.dto.OrderRequestDto;
import com.example.backend.dto.OrderResponseDto;
import com.example.backend.service.OrderSearch;
import com.example.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderRequestDto> createOrder(@RequestBody OrderRequestDto orderDto) {
        orderService.order(orderDto.getMemberId(), orderDto.getProductId(), orderDto.getCount());
        return new ResponseEntity<>(orderDto, HttpStatus.OK);
    }

    @PostMapping("search")
    public ResponseEntity<List<OrderResponseDto>> orderList(@RequestBody OrderSearch orderSearch) {
        List<OrderResponseDto> orders = orderService.findOrders(orderSearch);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
