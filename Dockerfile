FROM openjdk:20

ENV ENVIRONMENT=production

MAINTAINER Marcell Dechant<hello@dechant.dev>

EXPOSE 8080

ADD backend/target/timetable-app.jar timetable-app.jar

ENTRYPOINT ["sh", "-c", "java -jar /timetable-app.jar"]
