package com.example.backend.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Configuration;
import javax.persistence.EntityManager;

@Configuration
public class QuerydslConfig {

    JPAQueryFactory queryFactory;

    public QuerydslConfig(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }
}
