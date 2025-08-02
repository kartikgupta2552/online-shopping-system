package com.apnacart.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity 
@Table(name = "users")
@Data //create getter and setter using lombok
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //tells db to generate unique ids
	private Long userId;
	
	@Column(nullable = false, length = 50) //name is mandatory for user registration
	private String userName;
	
	@Column(nullable = false, length = 15,unique = true)//length 15 for extra buffer in formatting, unique no for each user hence unique true
	private String mobileNo;
	
	@Column(nullable = false, length = 100, unique = true) //no duplicate email allowed,also email is mandatory
	private String email;
	
	@Column(length = 500)//address is not mandatory, can be added later in update user
	private String address;
	
	@Column(nullable = false, length = 255)//length 255 coz password saved as hashed value
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)//every user must have a role
	private UserRole role = UserRole.CUSTOMER;//make new users as customers by default
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private UserStatus status = UserStatus.ACTIVE;
	
	@CreationTimestamp //hibernate auto sets time when record is first created
	@Column(updatable = false) //can't modify it any further once created
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	private LocalDateTime updatedAt;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orders = new ArrayList<>();
	
	public boolean isActive() {
		return this.status == UserStatus.ACTIVE;
	}//isActive() ends
	
}//User class ends
