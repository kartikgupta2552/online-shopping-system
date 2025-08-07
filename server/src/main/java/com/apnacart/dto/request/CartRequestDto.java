package com.apnacart.dto.request;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartRequestDto {
    @NotNull(message = "UserId is required")
    private Long userId;
}//CartRequestDto ends
