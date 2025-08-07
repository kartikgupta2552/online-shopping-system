package com.apnacart.controller;

// --- IMPORTS: Only what you need! ---
import com.apnacart.dto.request.CartItemRequestDto;
import com.apnacart.dto.response.CartResponseDto;
import com.apnacart.payload.ApiResponse;
import com.apnacart.security.CustomPrincipal;
import com.apnacart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService; // Dependency injection for business logic

    /**
     * GET /cart
     * Retrieves the cart (with all items) for the currently authenticated user.
     * @AuthenticationPrincipal ensures only JWT-authenticated users hit this.
     */
    @GetMapping
    @PreAuthorize("isAuthenticated()") // 🔒 Only let logged-in zombies see their cart!
    public ResponseEntity<ApiResponse<CartResponseDto>> getCartForCurrentUser(
            @AuthenticationPrincipal CustomPrincipal principal
    ) {
        // If someone smashes JWT—security will 401 this anyway (principal==null)!
        Long userId = principal.getUserId();
        CartResponseDto cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Cart fetched successfully", cart));
    }

    /**
     * POST /cart/add
     * Add a product (and quantity) to the currently authenticated user's cart.
     * Input: CartItemRequestDto (productId, quantity).
     */
    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> addItemToCart(
            @AuthenticationPrincipal CustomPrincipal principal,
            @RequestBody @Valid CartItemRequestDto itemDto
    ) {
        try {
            cartService.addItemToCart(principal.getUserId(), itemDto);
            return ResponseEntity.ok(ApiResponse.success("Item added to cart", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Error: " + e.getMessage(), e.toString()));
        }
    }

    /**
     * PUT /cart/update
     * Updates the quantity for a given cart item.
     * If you ever want partial updates (PATCH), change method accordingly.
     */
    @PutMapping("/update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> updateCartItem(
            @AuthenticationPrincipal CustomPrincipal principal,
            @RequestBody @Valid CartItemRequestDto itemDto
    ) {
        try {
            cartService.updateCartItem(principal.getUserId(), itemDto);
            return ResponseEntity.ok(ApiResponse.success("Cart item updated", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Error: " + e.getMessage(), e.toString()));
        }
    }

    /**
     * DELETE /cart/item/{productId}
     * Remove a product from the cart for the current user.
     * You CANNOT remove another user's shit: this is bulletproof.
     */
    @DeleteMapping("/item/{productId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> removeItemFromCart(
            @AuthenticationPrincipal CustomPrincipal principal,
            @PathVariable Long productId
    ) {
        try {
            cartService.removeItemFromCart(principal.getUserId(), productId);
            return ResponseEntity.ok(ApiResponse.success("Item removed from cart", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Error: " + e.getMessage(), e.toString()));
        }
    }

    /**
     * DELETE /cart/clear
     * Empties the entire cart for the current user.
     */
    @DeleteMapping("/clear")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> clearCart(
            @AuthenticationPrincipal CustomPrincipal principal
    ) {
        try {
            cartService.clearCart(principal.getUserId());
            return ResponseEntity.ok(ApiResponse.success("Cart cleared", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error: " + e.getMessage(), e.toString()));
        }
    }

}//CartController ends
