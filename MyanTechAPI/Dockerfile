<<<<<<< HEAD
# Build Stage
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy project files and build
COPY . .
RUN mvn clean package -DskipTests

# Debug: Check if the JAR file exists in the target directory
RUN ls -al /app/target

# Runtime Stage
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/MyanTechAPI-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
=======
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

From openjdk:17.0.1-jdk-slim
COPY --from=build /target/demo-0.0.1-SNAPSHOT.jar demo.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "demor.jar"]
>>>>>>> branch 'main' of git@github.com:kaung-pyae-shan/MyanTech.git
