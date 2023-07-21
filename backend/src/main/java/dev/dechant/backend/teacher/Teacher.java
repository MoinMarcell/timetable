package dev.dechant.backend.teacher;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "teachers")
public class Teacher {

    private String id;
    private String firstName;
    private String lastName;
    private String salutation;

}
