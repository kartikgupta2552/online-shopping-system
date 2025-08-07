# 1️⃣ Use Maven + JDK 17 for the build phase
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# 2️⃣ Set the working directory inside the container
WORKDIR /app

# 3️⃣ Copy only pom.xml and the Maven wrapper scripts (for dependencies layer caching)
COPY pom.xml mvnw mvnw.cmd ./
COPY .mvn .mvn

# 4️⃣ Pre-download all dependencies (speeds up builds)
RUN ./mvnw dependency:resolve

# 5️⃣ Now, copy the rest of your source code
COPY src src

# 6️⃣ Build the Spring Boot fat jar (output in target/)
RUN ./mvnw package --no-transfer-progress -DskipTests

# 7️⃣ Now, use a minimal JDK 17 runtime image (faster, smaller, less hacking risk)
FROM eclipse-temurin:17-jre

WORKDIR /app

# 8️⃣ Copy the fat jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# 9️⃣ Make uploads directory for bind mount (for Docker volume in Compose)
RUN mkdir /app/uploads

# 1️⃣0️⃣ Expose the default Spring Boot port
EXPOSE 8080

# 1️⃣1️⃣ Default command: Run the jar (tell Java where the files/props are)
CMD ["java","-jar","app.jar"]

