package com.apnacart.dao;

import com.apnacart.entity.Cart;
import com.apnacart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CartDao extends JpaRepository<Cart, Long> {
    // One cart per user (per design)
    Optional<Cart> findByUser_UserId(Long userId);
}//CartDao ends
