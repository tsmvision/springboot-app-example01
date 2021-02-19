package com.example.backend.repository;

import com.example.backend.domain.item.Book;
import com.example.backend.domain.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ItemRepository extends CrudRepository<Item, Long> {

    List<Item> findAll();

    @Query("select b from Book b")
    List<Book> findBooks();
}
