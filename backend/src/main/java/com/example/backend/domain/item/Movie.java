package com.example.backend.domain.item;

import com.example.backend.domain.item.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Getter
@Setter
@DiscriminatorValue("movie")
@NoArgsConstructor
public class Movie extends Item {

    private String director;
    private String actor;
}
