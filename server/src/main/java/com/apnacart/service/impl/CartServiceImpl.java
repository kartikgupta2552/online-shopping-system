package com.apnacart.service.impl;

// Standard imports so you don’t get compilation errors

import java.util.List;

import com.apnacart.service.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apnacart.dao.CartDao;
import com.apnacart.dao.CartItemDao;
import com.apnacart.dao.ProductDao;
import com.apnacart.dao.UserDao;
import com.apnacart.dto.request.CartItemRequestDto;
import com.apnacart.dto.response.CartItemResponseDto;
import com.apnacart.dto.response.CartResponseDto;
import com.apnacart.entity.Cart;
import com.apnacart.entity.CartItem;
import com.apnacart.entity.Product;
import com.apnacart.entity.User;
import com.apnacart.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartDao cartDao;
    private final CartItemDao cartItemDao;
    private final ProductDao productDao;
    private final UserDao userDao;
    private final ModelMapper modelMapper;

    @Override
    public CartResponseDto getCartByUserId(Long userId) {
        // Checks for user & cart so your DB doesn’t throw up later.
        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Cart cart = cartDao.findByUser_UserId(userId)
                .orElseGet(() -> cartDao.save(new Cart(user)));

        // Grab all cart items belonging to this cart
        List<CartItem> cartItems = cartItemDao.findByCart_CartId(cart.getCartId());

        // Map all CartItem to DTOs for frontend (only showing productId, name, image, price, quantity)
        List<CartItemResponseDto> cartItemDtos = cartItems.stream().map(item -> {
            CartItemResponseDto dto = new CartItemResponseDto();
            dto.setCartItemId(item.getCartItemId());
            dto.setProductId(item.getProduct().getProductId());
            dto.setProductName(item.getProduct().getProductName());
            dto.setImagePath(item.getProduct().getImagePath());
            dto.setPrice(item.getProduct().getPrice());
            dto.setQuantity(item.getQuantity());
            return dto;
        }).toList();

        // Package up, return the full DTO
        CartResponseDto cartResponseDto = new CartResponseDto();
        cartResponseDto.setCartId(cart.getCartId());
        cartResponseDto.setUserId(user.getUserId());
        cartResponseDto.setCartItems(cartItemDtos);
        return cartResponseDto;
    }//getCartByUserId() ends

    @Override
    @Transactional
    public void addItemToCart(Long userId, CartItemRequestDto dto) {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Cart cart = cartDao.findByUser_UserId(userId)
                .orElseGet(() -> cartDao.save(new Cart(user)));
        Product product = productDao.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + dto.getProductId()));

        CartItem cartItem = cartItemDao.findByCart_CartIdAndProduct_ProductId(cart.getCartId(), product.getProductId());

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + dto.getQuantity());
        } else {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(dto.getQuantity());
        }
        cartItemDao.save(cartItem);
    }//addItemToCart() ends

    @Override
    @Transactional
    public void updateCartItem(Long userId, CartItemRequestDto dto) {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Cart cart = cartDao.findByUser_UserId(userId)
                .orElseGet(() -> cartDao.save(new Cart(user)));
        Product product = productDao.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + dto.getProductId()));

        CartItem cartItem = cartItemDao.findByCart_CartIdAndProduct_ProductId(cart.getCartId(), product.getProductId());
        if (cartItem == null) {
            throw new ResourceNotFoundException("Cart item not found for product id: " + dto.getProductId());
        }
        cartItem.setQuantity(dto.getQuantity());
        cartItemDao.save(cartItem);
    }//updateCartItem() ends

    @Override
    @Transactional
    public void removeItemFromCart(Long userId, Long productId) {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Cart cart = cartDao.findByUser_UserId(userId)
                .orElseGet(() -> cartDao.save(new Cart(user)));

        CartItem cartItem = cartItemDao.findByCart_CartIdAndProduct_ProductId(cart.getCartId(), productId);

        if (cartItem != null) {
            cartItemDao.delete(cartItem);
        }
    }//removeItemFromCart() ends

    @Override
    @Transactional
    public void clearCart(Long userId) {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Cart cart = cartDao.findByUser_UserId(userId)
                .orElseGet(() -> cartDao.save(new Cart(user)));

        cartItemDao.deleteAllByCart_CartId(cart.getCartId());
    }//clearCart() ends



}//CartServiceImpl ends

