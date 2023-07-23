package dev.dechant.backend.course;

public record CourseRequest(
        String name,
        Integer amountOfStudents,
        String teacherId
) {
}
