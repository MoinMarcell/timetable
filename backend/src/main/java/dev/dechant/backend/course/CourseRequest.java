package dev.dechant.backend.course;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CourseRequest(
        @NotBlank(message = "Name is required")
        @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
        String name,
        @Min(value = 1, message = "Amount of students must be greater than 0")
        @Max(value = 28, message = "Amount of students must be less than 29")
        Integer amountOfStudents,
        String teacherId
) {
}
