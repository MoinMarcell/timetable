package dev.dechant.backend.course;

import dev.dechant.backend.teacher.Teacher;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "courses")
public class Course {

    private String id;
    private String name;
    @Max(28)
    @Min(1)
    private Integer amountOfStudents;
    @DBRef(
            db = "teachers",
            lazy = true
    )
    private Teacher teacher;

}
