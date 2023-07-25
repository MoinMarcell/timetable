package dev.dechant.backend.exception;

import dev.dechant.backend.course.CourseNotFoundException;
import dev.dechant.backend.module.ModuleNotFoundException;
import dev.dechant.backend.teacher.TeacherNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    public static final String MESSAGE = "message";
    public static final String TIMESTAMP = "timestamp";

    @ExceptionHandler(TeacherNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleTeacherNotFoundException(TeacherNotFoundException exception) {
        Map<String, String> body = Map.of(
                MESSAGE, exception.getMessage(),
                TIMESTAMP, Instant.now().toString()
        );

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CourseNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleCourseNotFoundException(CourseNotFoundException exception) {
        Map<String, String> body = Map.of(
                MESSAGE, exception.getMessage(),
                TIMESTAMP, Instant.now().toString()
        );

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ModuleNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleModuleNotFoundException(ModuleNotFoundException exception) {
        Map<String, String> body = Map.of(
                MESSAGE, exception.getMessage(),
                TIMESTAMP, Instant.now().toString()
        );

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

}
