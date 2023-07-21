package dev.dechant.backend.teacher;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherRepository teacherRepository;

    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable String id) {
        return teacherRepository
                .findById(id)
                .orElseThrow(() -> new TeacherNotFoundException("Teacher with id " + id + " not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Teacher createTeacher(@RequestBody TeacherRequest teacher) {
        return teacherRepository.save(
                Teacher.builder()
                        .firstName(teacher.firstName())
                        .lastName(teacher.lastName())
                        .salutation(teacher.salutation())
                        .build()
        );
    }

    @PostMapping("/multiple")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Teacher> createTeachers(@RequestBody List<TeacherRequest> teachers) {
        return teacherRepository.saveAll(
                teachers.stream()
                        .map(teacher -> Teacher.builder()
                                .firstName(teacher.firstName())
                                .lastName(teacher.lastName())
                                .salutation(teacher.salutation())
                                .build()
                        )
                        .toList()
        );
    }

    @PutMapping("/{id}")
    public Teacher updateTeacher(@PathVariable String id, @RequestBody TeacherRequest teacher) {
        return teacherRepository
                .findById(id)
                .map(teacherToUpdate -> {
                    teacherToUpdate.setFirstName(teacher.firstName());
                    teacherToUpdate.setLastName(teacher.lastName());
                    teacherToUpdate.setSalutation(teacher.salutation());
                    return teacherRepository.save(teacherToUpdate);
                })
                .orElseThrow(() -> new TeacherNotFoundException("Teacher with id " + id + " not found"));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTeacher(@PathVariable String id) {
        teacherRepository.deleteById(id);
    }

    @ExceptionHandler(TeacherNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleTeacherNotFoundException(TeacherNotFoundException exception) {
        Map<String, String> body = Map.of(
                "message", exception.getMessage(),
                "timestamp", String.valueOf(System.currentTimeMillis()
                )
        );

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

}
