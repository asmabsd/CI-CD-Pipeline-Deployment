FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:17
WORKDIR /app

ENV ACTIVE_PROFILE=dev
ENV DB_URL=jdbc:mysql://mysql:3306/crudpi
ENV EMAIL_HOST_NAME=maildev
ENV EMAIL_USER_NAME=test
ENV EMAIL_PASSWORD=test

COPY --from=build /build/target/crudpi-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080
EXPOSE 5005

CMD java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 \
    -Dspring.profiles.active=${ACTIVE_PROFILE} \
    -Dspring.datasource.url=${DB_URL} \
    -jar app.jar