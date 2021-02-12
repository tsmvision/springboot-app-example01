package com.example.backend.domain.item;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Getter
@Setter
@DiscriminatorValue("book")
@NoArgsConstructor
public class Book extends Item {

    private String author;
    private String isbn;
}
