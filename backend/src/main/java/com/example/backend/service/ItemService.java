package com.example.backend.service;

import com.example.backend.domain.item.Book;
import com.example.backend.domain.item.Item;
import com.example.backend.dto.BookDto;
import com.example.backend.repository.ItemRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public void saveBook(BookDto itemDto) {

        itemRepository.save(
                new Book(
                        itemDto.getName(),
                        itemDto.getPrice(),
                        itemDto.getStockQuantity(),
                        itemDto.getAuthor(),
                        itemDto.getIsbn())
                );
    }

    public void updateBook(BookDto itemDto) throws NotFoundException {
        Optional<Item> item = itemRepository.findById(itemDto.getId());

        if (item.isEmpty()) {
            throw new NotFoundException("Existing book not found");
        }
        else {
            Book book = (Book) item.get();
            book.setName(itemDto.getName());
            book.setPrice(itemDto.getPrice());
            book.setStockQuantity(itemDto.getStockQuantity());
            book.setAuthor(itemDto.getAuthor());
            book.setIsbn(itemDto.getIsbn());
            itemRepository.save(book);
        }
    }

    public List<BookDto> getBooks() {
        List<Book> books = itemRepository.findBooks();
        List<BookDto> bookDtoList = new ArrayList<>();

        for (Book book : books) {
            bookDtoList.add(
                    new BookDto(
                            book.getId(),
                            book.getName(),
                            book.getPrice(),
                            book.getStockQuantity(),
                            book.getAuthor(),
                            book.getIsbn())
                    );
        }

        return bookDtoList;
    }

    public List<Item> findItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> findById(Long id) {
        return itemRepository.findById(id);
    }
}
