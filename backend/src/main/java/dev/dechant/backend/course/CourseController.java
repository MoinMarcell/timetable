package dev.dechant.backend.course;

import dev.dechant.backend.teacher.Teacher;
import dev.dechant.backend.teacher.TeacherNotFoundException;
import dev.dechant.backend.teacher.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;
    private static final String ERROR_MESSAGE = "Course does not exist";

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException(ERROR_MESSAGE));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCourse(@RequestBody CourseRequest course) {

        if (course.teacherId() == null) {
            return courseRepository.save(
                    Course.builder()
                            .name(course.name())
                            .amountOfStudents(course.amountOfStudents())
                            .build()
            );
        } else {
            Optional<Teacher> teacher = getOptionalTeacherById(course.teacherId());

            if (teacher.isEmpty()) {
                throw new TeacherNotFoundException("Teacher with id " + course.teacherId() + " not found");
            }

            return courseRepository.save(
                    Course.builder()
                            .name(course.name())
                            .amountOfStudents(course.amountOfStudents())
                            .teacher(teacher.get())
                            .build()
            );
        }
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable String id, @RequestBody CourseRequest course) {

        if (!courseRepository.existsById(id)) {
            throw new CourseNotFoundException(ERROR_MESSAGE);
        }

        if (course.teacherId() == null) {
            return courseRepository.save(
                    Course.builder()
                            .id(id)
                            .name(course.name())
                            .amountOfStudents(course.amountOfStudents())
                            .teacher(null)
                            .build()
            );
        }

        Optional<Teacher> teacher = getOptionalTeacherById(course.teacherId());

        if (teacher.isEmpty()) {
            throw new TeacherNotFoundException("Teacher with id " + course.teacherId() + " not found");
        }

        return courseRepository.save(
                Course.builder()
                        .id(id)
                        .name(course.name())
                        .amountOfStudents(course.amountOfStudents())
                        .teacher(teacher.get())
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@PathVariable String id) {
        if (!courseRepository.existsById(id)) {
            throw new CourseNotFoundException(ERROR_MESSAGE);
        }

        courseRepository.deleteById(id);
    }

    private Optional<Teacher> getOptionalTeacherById(String teacherId) {
        return teacherRepository.findById(teacherId);
    }

}
