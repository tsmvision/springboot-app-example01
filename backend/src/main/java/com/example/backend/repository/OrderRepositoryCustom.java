package com.example.backend.repository;

import com.example.backend.domain.Order;
import com.example.backend.service.OrderSearch;

import java.util.List;

public interface OrderRepositoryCustom {
    List<Order> findAll(OrderSearch orderSearch);
}
