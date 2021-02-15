package com.example.backend.controller;

import com.example.backend.dto.BookDto;
import com.example.backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/items/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<BookDto> createBook(@RequestBody BookDto bookDto) {
        log.info("ItemController: createItem()");
        itemService.saveBook(bookDto);
        return new ResponseEntity<>(bookDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> getBooks() {
        log.info("ItemController: getBooks()");
        return new ResponseEntity<>(itemService.getBooks(), HttpStatus.OK);
    }
}
