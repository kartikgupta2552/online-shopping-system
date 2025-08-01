package com.apnacart.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apnacart.entity.User;
import com.apnacart.entity.UserStatus;

import java.util.List;

//data access layer
@Repository
public interface UserDao extends JpaRepository<User, Long> {

	//find user by email(login functionality)
	Optional<User> findByEmail(String email);
	//optional used for safe null handling (for the user not found case)
	
	//find user by phone no
	Optional<User> findByMobileNo(String mobileNo);
	
	//find user by id
	Optional<User> findByUserId(Long userId);
	
	//check if mail already exists(prevents duplicate user registration)
	boolean existsByEmail(String email); 
	
	//check if phone already exists(prevents duplicate user registration)
	boolean existsByMobileNo(String mobileNo);
	
	//find user by status(admin functionality)
	List<User> findByStatus(UserStatus status);
	
	
}//UserRepository interface ends
