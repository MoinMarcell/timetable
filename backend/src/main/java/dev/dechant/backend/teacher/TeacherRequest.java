package dev.dechant.backend.teacher;

public record TeacherRequest(
        String firstName,
        String lastName,
        String salutation
) {
}
