# 🛒 ApnaCart - Online Shopping System

> A comprehensive, full-stack e-commerce platform built with Spring Boot and React, designed to deliver a seamless online shopping experience.

---

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Docker & Deployment](#docker--deployment)
- [Development Team](#development-team)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Support](#support)

---

## 🎯 About

ApnaCart is a robust full-stack e-commerce application developed as part of our **PG-DAC CDAC final project**. It provides a comprehensive platform for online shopping with secure user authentication, product catalog management, order processing capabilities, and role-based access controls, all wrapped in a modern React frontend communicating with a Spring Boot REST API backed by MySQL.

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication** with Spring Security integration
- **BCrypt Password Hashing** for secure credential storage
- **Role-based Access Control** (Customer, Admin, Delivery Partner)
- **Account Status Management** (Active, Inactive, Blocked)
- **Bearer token authorization** for API endpoints

### 🛍️ Core E-commerce Features
- **User Registration & Profile Management** with validation
- **Product Catalog** with categories and advanced search
- **Shopping Cart Functionality** with persistent storage
- **Order Management System** with status tracking
- **Responsive React Frontend** with Bootstrap styling
- **Admin Dashboard** for comprehensive system management

### 📊 Additional Features
- **RESTful API Architecture** with standardized responses
- **Comprehensive Input Validation** on both frontend and backend
- **Global Exception Handling** with meaningful error messages
- **Interactive API Documentation** with Swagger/OpenAPI
- **Dockerized Deployment** for consistent environments

---

## 🛠️ Tech Stack

### Backend
- **Java 17** - Latest LTS version
- **Spring Boot 3.5.4** - Main application framework
- **Spring Security** - JWT-based authentication
- **Spring Data JPA** - Database operations
- **MySQL 8.0+** - Primary relational database
- **Lombok** - Reducing boilerplate code
- **Swagger/OpenAPI** - API documentation

### Frontend
- **React.js** - Component-based UI library
- **Bootstrap** - Responsive design framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

### Development Tools
- **Maven** - Dependency management and build automation
- **Git** - Version control system
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration

---

## 🏗️ Architecture

The application follows a modern **3-tier architecture**:

- **Presentation Layer**: React SPA with Bootstrap styling
- **Business Logic Layer**: Spring Boot REST APIs with JWT security
- **Data Layer**: MySQL database with JPA/Hibernate ORM

**Communication Flow**:
1. React components make HTTP requests to Spring Boot controllers
2. JWT tokens are passed in Authorization headers (Bearer token)
3. Spring Security validates tokens and enforces role-based access
4. JPA repositories handle database operations with proper transaction management

---

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js 16+** and npm
- **MySQL 8.0+**
- **Maven 3.6+**
- **Docker & Docker Compose** (optional)
- **Git**

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd apnacart
````

2. **Create MySQL database**
    

```mysql
mysql -u root -p
CREATE DATABASE apnacart;
```

3. **Configure Database Connection**  
    Update `server/src/main/resources/application.properties`:
    

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/apnacart?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=your-mysql-username
spring.datasource.password=your-mysql-password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your-jwt-secret-key
```

4. **Run the Backend**
    

```bash
cd server
./mvnw spring-boot:run
```

Backend will start on `http://localhost:8080`

---

### Frontend Setup

1. **Navigate to frontend directory**
    

```bash
cd frontend
```

2. **Install dependencies**
    

```bash
npm install
```

3. **Configure API endpoint**  
    Create `.env` file in frontend directory:
    

```env
REACT_APP_API_URL=http://localhost:8080
```

4. **Start the development server**
    

```bash
npm start
```

Frontend will start on `http://localhost:3000`

---

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
    
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`
    

### Key API Endpoints

|Method|Endpoint|Description|Auth Required|
|---|---|---|---|
|`POST`|`/api/users/register`|User registration|No|
|`POST`|`/api/users/login`|User authentication|No|
|`GET`|`/api/users/{userId}/profile`|Get user profile|Yes|
|`PUT`|`/api/users/{userId}/profile`|Update user profile|Yes|
|`GET`|`/api/users/all`|Get all users|Admin only|
|`GET`|`/api/products`|Get all products|No|
|`POST`|`/api/products`|Create product|Admin only|
|`POST`|`/api/orders`|Place order|Customer|

---

## 🗂️ Project Structure

```
apnacart/
├── server/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/apnacart/
│   │       ├── controller/  # REST controllers
│   │       ├── service/     # Business logic
│   │       ├── repository/  # Data access layer
│   │       ├── entity/      # JPA entities
│   │       ├── dto/         # Data transfer objects
│   │       └── config/      # Configuration classes
│   └── src/main/resources/
│       └── application.properties
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service calls
│   │   └── utils/          # Utility functions
│   └── public/
├── docker-compose.yml      # Multi-container setup
└── README.md
```

---

## 🐳 Docker & Deployment

### Using Docker Compose

1. **Build and start all services**
    

```bash
docker-compose up --build
```

2. **Stop services**
    

```bash
docker-compose down
```

### Docker Compose Configuration

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: apnacart-mysql
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: apnacart
    ports:
      - "3306:3306"
    volumes:
      - db_/var/lib/mysql

  backend:
    build: ./server
    container_name: apnacart-backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/apnacart
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: rootpass
    ports:
      - "8080:8080"
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    container_name: apnacart-frontend
    environment:
      REACT_APP_API_URL: http://localhost:8080
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  db_
```

---

## 👥 Development Team

This project is developed by a dedicated team of three developers:

- **Tushar** 
    
- **Kartik** 
    
- **Akanksha**
    

_Developed as part of Post Graduate Diploma in Advanced Computing (PG-DAC) program at CDAC._

---

## 🔮 Future Enhancements

### 🎯 Upcoming Features

-  **Payment Gateway Integration** (Razorpay/Stripe)
    
-  **Advanced Admin Dashboard** with analytics
    
-  **Product Reviews & Ratings System**
    
-  **Wishlist Functionality**
    
-  **Real-time Order Tracking**
    
-  **Multi-language Support**
    

### 🚀 Deployment Goals

-  **AWS Cloud Deployment** with RDS and EC2
    
-  **CI/CD Pipeline** with GitHub Actions
    
-  **Performance Monitoring** with metrics
    
-  **Load Balancing** for scalability
    
-  **Redis Caching** for improved performance
    

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
    
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
    
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
    
4. Push to the branch (`git push origin feature/AmazingFeature`)
    
5. Open a Pull Request
    

### Development Guidelines

- Follow existing code style and conventions
    
- Write meaningful commit messages
    
- Add tests for new features
    
- Update documentation as needed
    

---

## 📞 Support

For any queries regarding this project, feel free to reach out to our development team or create an issue in the repository.

---
