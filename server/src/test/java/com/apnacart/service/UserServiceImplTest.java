package com.apnacart.service;

import com.apnacart.dao.UserDao;
import com.apnacart.dto.request.*;
import com.apnacart.entity.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;


/**
 * Business-logic tests for UserServiceImpl.
 * We mock the DAO, mapper and password encoder so the test
 * stays 100 % in memory and executes in < 10 ms.
 */


@ExtendWith(MockitoExtension.class) //enables mockito annotations
@DisplayName("UserServiceImpl - Unit tests")
public class UserServiceImplTest {
	
	//test case
	@Mock 
	private UserDao userDao;
	
	@InjectMocks //injects above created objects into below
	private UserService userService;
	
	@Test
	void simpleRegisterUser_callsSave() {
		
		//1. Arrange -> create dummy registration dto and user entity
		UserRegistrationDto registrationDto = new UserRegistrationDto();
		registrationDto.setEmail("test@example.com");
		registrationDto.setMobileNo("9876543210");
		registrationDto.setPassword("Test@123");
		
		User userEntity = new User();
		userEntity.setEmail("test@example.com");
		userEntity.setMobileNo("9876543210");
		
		//2. Mock behaviour
		when(userDao.existsByEmail(anyString())).thenReturn(false);
		when(userDao.existsByMobileNo(anyString())).thenReturn(false);
		when(userDao.save(any(User.class))).thenReturn(userEntity);
		
		//3. Act
		userService.registerUser(registrationDto);
		
		//4. Assert : verify save was called once
		verify(userDao,times(1)).save(any(User.class));
		
	}//simpleRegisterUser_callsSave() ends
	

}//UserServiceImplTest
