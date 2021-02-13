package com.example.backend.repository;

import com.example.backend.domain.Order;
import com.example.backend.domain.OrderStatus;
import com.example.backend.service.OrderSearch;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import static com.example.backend.domain.QOrder.order;
import static com.example.backend.domain.QMember.member;
import java.util.List;

@RequiredArgsConstructor
public class OrderRepositoryImpl implements OrderRepositoryCustom{

    JPAQueryFactory queryFactory;

    @Override
    public List<Order> findAll(OrderSearch orderSearch) {
        return queryFactory
                .selectFrom(order)
                .join(order.member, member)
                .where(
                        statusEq(orderSearch.getOrderStatus()),
                        nameLike(orderSearch.getMemberName())
                ).fetch();
    }

    private BooleanExpression statusEq(OrderStatus orderStatus) {
        if (orderStatus == null) {
            return null;
        }
        return order.status.eq(orderStatus);
    }

    private BooleanExpression nameLike(String name) {
        if (!StringUtils.hasText(name)) {
            return null;
        }
        return member.username.like(name);
    }
}
