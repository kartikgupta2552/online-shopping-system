package com.apnacart.dto.response;

import com.apnacart.dto.request.CartItemRequestDto;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CartResponseDto {
    private Long cartId;
    private Long userId;
    private List<CartItemResponseDto> cartItems;
}//CartResponseDto ends
