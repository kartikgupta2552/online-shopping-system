package com.apnacart.service;

import com.apnacart.dto.response.CartResponseDto;
import com.apnacart.dto.request.CartItemRequestDto;

public interface CartService {
    CartResponseDto getCartByUserId(Long userId); // always fetches full cart w/ item details

    void addItemToCart(Long userId, CartItemRequestDto dto); // add or increment product in cart

    void updateCartItem(Long userId, CartItemRequestDto dto); // change qty for item

    void removeItemFromCart(Long userId, Long productId); // delete item by product id

    void clearCart(Long userId); // wipe entire cart (after order placed)
}//CartService ends
