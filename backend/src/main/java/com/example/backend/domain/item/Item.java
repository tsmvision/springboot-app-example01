package com.example.backend.domain.item;

import com.example.backend.domain.CategoryItem;
import com.example.backend.domain.OrderItem;
import com.example.backend.exception.NotEnoughStockException;
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

    public Item(String name, int price, int stockQuantity) {
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    /**
     * increase stock
     * @param quantity
     */
    public void addStock(int quantity) {
        stockQuantity += quantity;
    }

    public void removeStock(int quantity) {
        int remainStock = stockQuantity - quantity;

        if (remainStock < 0) {
            throw new NotEnoughStockException("not enough stock");
        }

        stockQuantity -= quantity;
    }
}
