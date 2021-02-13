package com.example.backend.service;

import com.example.backend.domain.Address;
import com.example.backend.domain.Member;
import com.example.backend.domain.Order;
import com.example.backend.domain.OrderStatus;
import com.example.backend.domain.item.Book;
import com.example.backend.domain.item.Item;
import com.example.backend.exception.NotEnoughStockException;
import com.example.backend.repository.ItemRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class OrderServiceTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    OrderService orderService;

    @Autowired
    OrderRepository orderRepository;

    @Test
    public void orderProductTest() {
        // given
        Member member = createMember("member01", "city1", "street1", "12345");
        Book book = createBook("jpa book", 10, 10);

        // when
        int orderCount = 2;
        Long orderId = orderService.order(member.getId(), book.getId(), orderCount);

        // then
        Optional<Order> getOrder = orderRepository.findById(orderId);

        assertEquals( OrderStatus.ORDER, getOrder.get().getStatus(), "status should be ORDER when product ordered");
        assertEquals(1, getOrder.get().getOrderItems().size(),"the number of order quantity should be correct");
        assertEquals(10 * orderCount, getOrder.get().getTotalPrice(), "order price should be price * quanitty");
        assertEquals(8, book.getStockQuantity(),"stock quantity should be reduced when ordered");
    }

    @Test
    public void exceedStockQuantityTest() {
        // given
        Member member = createMember("member01", "city1", "street1", "12345");
        Book item = createBook("jpa book", 10, 10);

        int orderCount = 11;

        // when
        assertThrows(NotEnoughStockException.class,
                () -> orderService.order(member.getId(),item.getId(), orderCount),
                "insufficient stock exception should be thrown");

        // then
    }

    @Test
    public void cancelOrderTest() {
        // given
        Member member = createMember("member01", "city1", "street1", "12345");
        Book item = createBook("jpa book", 10, 10);

        int orderCount = 2;
        Long orderId = orderService.order(member.getId(), item.getId(), orderCount);

        // when
        orderService.cancelOrder(orderId);

        // then
        Optional<Order> getOrder = orderRepository.findById(orderId);

        assertEquals(OrderStatus.CANCEL, getOrder.get().getStatus(), "Order status should be CANCEL when order cancelled");
        assertEquals(10, item.getStockQuantity(),  "stock quantity of the item should be recovered if order cancelled");
    }

    private Member createMember(String username, String city, String street, String zipcode) {
        Member member = new Member();
        member.setUsername(username);
        member.setAddress(new Address(city, street, zipcode));
        memberRepository.save(member);
        return member;
    }

    private Book createBook(String name, int price, int stockQuantity) {
        Book book = new Book();
        book.setName(name);
        book.setPrice(price);
        book.setStockQuantity(stockQuantity);
        itemRepository.save(book);
        return book;
    }
}