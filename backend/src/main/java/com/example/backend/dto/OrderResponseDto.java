package com.example.backend.dto;

import com.example.backend.domain.item.Book;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class OrderResponseDto {

    private final Long id;
    private final String memberName;
//    private List<Book> books;
//    private Long price;
//    private int stockQuantity;
//    private String status;
//    private LocalDateTime orderDate;
}
