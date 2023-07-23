package dev.dechant.backend.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "courses")
public class Course {

    private String id;
    private String name;
    private Integer amountOfStudents;
    private String teacherId;

}
