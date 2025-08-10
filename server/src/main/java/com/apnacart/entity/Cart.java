package com.apnacart.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

//@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Cart {
    @Id
    @GeneratedValue
    private Long cartId;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false) // A cart always tied to a user
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    public Cart(User user) {
        this.user = user;
    }


}//Cart ends
