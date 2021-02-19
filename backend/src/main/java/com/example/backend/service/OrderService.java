package com.example.backend.service;

import com.example.backend.domain.Delivery;
import com.example.backend.domain.Member;
import com.example.backend.domain.Order;
import com.example.backend.domain.OrderItem;
import com.example.backend.domain.item.Item;
import com.example.backend.dto.OrderRequestDto;
import com.example.backend.dto.OrderResponseDto;
import com.example.backend.repository.ItemRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;

    // order
    public Long order(Long memberId, Long itemId, int count) {

        // access entities
        Member member = memberRepository.findById(memberId).orElseGet(null);
        Item item = itemRepository.findById(itemId).orElseGet(null);

        // generate delivery information
        Delivery delivery = new Delivery();
        delivery.setAddress(member.getAddress());

        // generate order item
        OrderItem orderItem = OrderItem.createOrderItem(item, item.getPrice(), count);

        // generate order
        Order order = Order.createOrder(member, delivery, orderItem);

        // save order
        orderRepository.save(order);

        return order.getId();
    }

    // cancel
    public void cancelOrder(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);

        order.ifPresent(Order::cancel);
    }

    // search
    public List<OrderResponseDto> findOrders(OrderSearch orderSearch) {
        List<Order> orders = orderRepository.findAll(orderSearch);
       return orders
               .stream()
               .map(
                       order -> new OrderResponseDto(
                                order.getId(),
                                order.getMember().getUsername())
               ).collect(Collectors.toList());
    }
}
