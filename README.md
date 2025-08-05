# 🛒 ApnaCart - Online Shopping System

> A comprehensive e-commerce platform built with Spring Boot and React, designed to deliver a seamless online shopping experience.

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-brightgreen?style=flat-square&logo=spring)
![React](https://img.shields.io/badge/React-Frontend-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=flat-square&logo=jsonwebtokens)

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development Team](#development-team)
- [Future Enhancements](#future-enhancements)

## 🎯 About

ApnaCart is a full-stack e-commerce application developed as part of our **PG-DAC CDAC final project**. It provides a robust platform for online shopping with secure user authentication, product catalog management, and order processing capabilities.

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication** with Spring Security
- **BCrypt Password Hashing** for secure credential storage
- **Role-based Access Control** (Customer, Admin, Delivery Partner)
- **Account Status Management** (Active, Inactive, Blocked)

### 🛍️ Core E-commerce Features
- **User Registration & Profile Management**
- **Product Catalog with Categories**
- **Shopping Cart Functionality**
- **Order Management System**
- **Responsive React Frontend** with Bootstrap

### 📊 Additional Features
- **RESTful API Architecture**
- **Comprehensive Input Validation**
- **Global Exception Handling**
- **API Documentation** with Swagger/OpenAPI

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.5.4**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA** (Database Operations)
- **MySQL** (Primary Database)
- **Lombok** (Code Generation)
- **Swagger/OpenAPI** (API Documentation)

### Frontend
- **React.js**
- **Bootstrap** (UI Framework)

### Development Tools
- **Maven** (Dependency Management)
- **Git** (Version Control)

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js 16+** and npm
- **MySQL 8.0+**
- **Maven 3.6+**
- **Git**

### Backend Setup

1. **Clone the repository**
```bash
git clone  cd apnacart
```
2. **Create MySQL database**
```mysql
mysql -u root -p 
CREATE DATABASE apnacart;
```

3. **Configure Database Connection**
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/apnacart?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true spring.datasource.username=your-mysql-username spring.datasource.password=your-mysql-password
```

4. **Run the Backend**
```java
cd server 
./mvnw spring-boot:run
```
Backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```
Frontend will start on `http://localhost:3000`

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

### Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register` | User registration |
| `POST` | `/api/users/login` | User authentication |
| `GET` | `/api/users/{userId}/profile` | Get user profile |
| `PUT` | `/api/users/{userId}/profile` | Update user profile |
| `GET` | `/api/users/all` | Get all users (Admin) |


## 👥 Development Team

This project is developed by a dedicated team of three developers:

- **Tushar**
- **Kartik**   
- **Akanksha** 

*Developed as part of Post Graduate Diploma in Advanced Computing (PG-DAC) program at CDAC.*

## 🔮 Future Enhancements

### 🎯 Upcoming Features
- [ ] **Payment Gateway Integration** (Razorpay/Stripe)
- [ ] **Admin Dashboard** for comprehensive management
- [ ] **Email Notifications** for order updates
- [ ] **Product Reviews & Ratings**
- [ ] **Wishlist Functionality**
- [ ] **Order Tracking System**

### 🚀 Deployment Goals
- [ ] **Docker Containerization**
- [ ] **AWS Cloud Deployment**
- [ ] **CI/CD Pipeline Setup**
- [ ] **Performance Optimization**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For any queries regarding this project, feel free to reach out to our development team.

---

**Built with ❤️ by Team ApnaCart | PG-DAC CDAC Final Project**
