package com.apnacart.dao;

import com.apnacart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartItemDao extends JpaRepository<CartItem, Long> {
    // Find all items in a cart (for display, clearing, etc)
    List<CartItem> findByCart_CartId(Long cartId);

    // (Optional) For fast lookup if product already in cart
    CartItem findByCart_CartIdAndProduct_ProductId(Long cartId, Long productId);

    //Bulk delete cart items for a cart
    void deleteAllByCart_CartId(Long cartId);

}//CartItemDao ends
