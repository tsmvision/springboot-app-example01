package com.example.backend.domain.item;

import com.example.backend.domain.CategoryItem;
import com.example.backend.domain.OrderItem;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
@NoArgsConstructor
public abstract class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long id;

    private String name;
    private int price;
    private int stockQuantity;

    @OneToMany(mappedBy = "item")
    private List<OrderItem> orderItems;

    @OneToMany(mappedBy = "item")
    private List<CategoryItem> categoryItems;


}
