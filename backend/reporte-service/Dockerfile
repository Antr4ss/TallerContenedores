# ...existing code...
# Build stage: usar imagen con Maven + JDK 21
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

# Run stage
FROM eclipse-temurin:21-jre
ARG JAR_FILE=/app/target/*.jar
COPY --from=build /app/target/*.jar /app/app.jar
# el servicio corre en 8082 según application.properties
EXPOSE 8083
ENTRYPOINT ["java","-jar","/app/app.jar"]
# ...existing code...