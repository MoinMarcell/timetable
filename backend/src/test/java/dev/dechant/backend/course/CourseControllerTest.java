package dev.dechant.backend.course;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.dechant.backend.teacher.Teacher;
import dev.dechant.backend.teacher.TeacherRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CourseControllerTest {

    public static final String BASE_URL = "/api/v1/courses";
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllCourses_whenLoggedInAndNoCoursesInDataBase_expectStatus200AndReturnEmptyList() throws Exception {
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllCourses_whenLoggedInAndCoursesInDataBase_expectStatus200AndReturnListOfCourses() throws Exception {

        TeacherRequest teacherRequest = new TeacherRequest("Max", "Muster", "Herr");
        String teacherRequestJson = objectMapper.writeValueAsString(teacherRequest);

        MvcResult teacherPostResult = mockMvc.perform(post("/api/v1/teachers")
                        .with(csrf())
                        .contentType("application/json")
                        .content(teacherRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String teacherPostResultBody = teacherPostResult.getResponse().getContentAsString();
        Teacher createdTeacher = objectMapper.readValue(teacherPostResultBody, Teacher.class);

        CourseRequest courseRequest = new CourseRequest("Math", 20, createdTeacher.getId());
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        MvcResult mvcResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String body = mvcResult.getResponse().getContentAsString();
        Course course = objectMapper.readValue(body, Course.class);

        List<Course> courses = List.of(course);
        String coursesJson = objectMapper.writeValueAsString(courses);

        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(content().json(coursesJson));
    }

    @Test
    @DirtiesContext
    void getAllCourses_whenNotLoggedIn_expectStatus401() throws Exception {
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getCourseById_whenLoggedInAndCourseExist_expectStatus200AndReturnCourse() throws Exception {
        CourseRequest courseRequest = new CourseRequest("Math", 20, null);
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        MvcResult mvcResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String body = mvcResult.getResponse().getContentAsString();
        Course course = objectMapper.readValue(body, Course.class);

        mockMvc.perform(get(BASE_URL + "/" + course.getId()))
                .andExpect(status().isOk())
                .andExpect(content().json(body));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getCourseById_whenLoggedInAndCourseNotExist_expectStatus404AndBodyWithException() throws Exception {
        String id = "1";

        mockMvc.perform(get(BASE_URL + "/" + id))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void getCourseById_whenNotLoggedIn_expectStatus401() throws Exception {
        String id = "1";

        mockMvc.perform(get(BASE_URL + "/" + id))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createCourse_whenLoggedInAndTeacherExist_expectStatus201AndCreatedCourseWithTeacher() throws Exception {

        TeacherRequest teacherRequest = new TeacherRequest("Max", "Muster", "Herr");
        String teacherRequestJson = objectMapper.writeValueAsString(teacherRequest);

        MvcResult teacherPostResult = mockMvc.perform(post("/api/v1/teachers")
                        .with(csrf())
                        .contentType("application/json")
                        .content(teacherRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String teacherPostResultBody = teacherPostResult.getResponse().getContentAsString();
        Teacher createdTeacher = objectMapper.readValue(teacherPostResultBody, Teacher.class);

        CourseRequest courseRequest = new CourseRequest("Math", 20, createdTeacher.getId());
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        MvcResult coursePostResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String coursePostResultBody = coursePostResult.getResponse().getContentAsString();
        Course createdCourse = objectMapper.readValue(coursePostResultBody, Course.class);

        assertEquals(courseRequest.name(), createdCourse.getName());
        assertEquals(courseRequest.amountOfStudents(), createdCourse.getAmountOfStudents());
        assertEquals(createdTeacher.getId(), createdCourse.getTeacherId());
        assertNotNull(createdCourse.getId());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createCourse_whenLoggedInAndTeacherNotExist_expectStatus404() throws Exception {
        CourseRequest courseRequest = new CourseRequest("Math", 20, "1");
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createCourse_whenLoggedInAndTeacherNull_expectStatus201AndCreatedCourse() throws Exception {
        CourseRequest courseRequest = new CourseRequest("Math", 20, null);
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        MvcResult coursePostResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String body = coursePostResult.getResponse().getContentAsString();
        Course createdCourse = objectMapper.readValue(body, Course.class);

        assertEquals(courseRequest.name(), createdCourse.getName());
        assertEquals(courseRequest.amountOfStudents(), createdCourse.getAmountOfStudents());
        assertNull(createdCourse.getTeacherId());
        assertNotNull(createdCourse.getId());
    }

    @Test
    @DirtiesContext
    void createCourse_whenNotLoggedIn_expectStatus401() throws Exception {
        CourseRequest courseRequest = new CourseRequest("Math", 20, "1");
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateCourse_whenLoggedInAndTeacherExist_expectStatus200AndUpdatedCourseWithTeacher() throws Exception {
        TeacherRequest teacherRequest = new TeacherRequest("Max", "Muster", "Herr");
        String teacherRequestJson = objectMapper.writeValueAsString(teacherRequest);

        MvcResult teacherPostResult = mockMvc.perform(post("/api/v1/teachers")
                        .with(csrf())
                        .contentType("application/json")
                        .content(teacherRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String teacherPostResultBody = teacherPostResult.getResponse().getContentAsString();
        Teacher createdTeacher = objectMapper.readValue(teacherPostResultBody, Teacher.class);

        CourseRequest courseRequest = new CourseRequest("Math", 20, createdTeacher.getId());
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        MvcResult coursePostResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String coursePostResultBody = coursePostResult.getResponse().getContentAsString();
        Course createdCourse = objectMapper.readValue(coursePostResultBody, Course.class);

        CourseRequest updatedCourseRequest = new CourseRequest("Math", 22, createdTeacher.getId());
        String updatedCourseRequestJson = objectMapper.writeValueAsString(updatedCourseRequest);

        MvcResult coursePutResult = mockMvc.perform(put(BASE_URL + "/" + createdCourse.getId())
                        .with(csrf())
                        .contentType("application/json")
                        .content(updatedCourseRequestJson))
                .andExpect(status().isOk())
                .andReturn();

        String coursePutResultBody = coursePutResult.getResponse().getContentAsString();
        Course updatedCourse = objectMapper.readValue(coursePutResultBody, Course.class);

        assertEquals(updatedCourseRequest.name(), updatedCourse.getName());
        assertEquals(updatedCourseRequest.amountOfStudents(), updatedCourse.getAmountOfStudents());
        assertEquals(createdTeacher.getId(), updatedCourse.getTeacherId());
        assertEquals(createdCourse.getId(), updatedCourse.getId());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateCourse_whenLoggedInAndTeacherNotExist_expectStatus404() throws Exception {

        CourseRequest courseRequest = new CourseRequest("Math", 20, null);
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        MvcResult coursePostResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String coursePostResultBody = coursePostResult.getResponse().getContentAsString();
        Course createdCourse = objectMapper.readValue(coursePostResultBody, Course.class);

        CourseRequest updatedCourseRequest = new CourseRequest("Math", 22, "1");
        String updatedCourseRequestJson = objectMapper.writeValueAsString(updatedCourseRequest);

        mockMvc.perform(put(BASE_URL + "/" + createdCourse.getId())
                        .with(csrf())
                        .contentType("application/json")
                        .content(updatedCourseRequestJson))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateCourse_whenLoggedInAndTeacherIsNull_expectStatus200AndUpdatedCourse() throws Exception {

        CourseRequest courseRequest = new CourseRequest("Math", 20, null);
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        MvcResult coursePostResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String coursePostResultBody = coursePostResult.getResponse().getContentAsString();
        Course createdCourse = objectMapper.readValue(coursePostResultBody, Course.class);

        CourseRequest updatedCourseRequest = new CourseRequest("Math", 22, null);
        String updatedCourseRequestJson = objectMapper.writeValueAsString(updatedCourseRequest);

        MvcResult coursePutResult = mockMvc.perform(put(BASE_URL + "/" + createdCourse.getId())
                        .with(csrf())
                        .contentType("application/json")
                        .content(updatedCourseRequestJson))
                .andExpect(status().isOk())
                .andReturn();

        String coursePutResultBody = coursePutResult.getResponse().getContentAsString();
        Course updatedCourse = objectMapper.readValue(coursePutResultBody, Course.class);

        assertEquals(updatedCourseRequest.name(), updatedCourse.getName());
        assertEquals(updatedCourseRequest.amountOfStudents(), updatedCourse.getAmountOfStudents());
        assertNull(updatedCourse.getTeacherId());
        assertEquals(createdCourse.getId(), updatedCourse.getId());
    }

    @Test
    @DirtiesContext
    void updateCourse_whenNotLoggedIn_expectStatus401() throws Exception {
        CourseRequest updatedCourseRequest = new CourseRequest("Math", 22, null);
        String updatedCourseRequestJson = objectMapper.writeValueAsString(updatedCourseRequest);

        mockMvc.perform(put(BASE_URL + "/1")
                        .with(csrf())
                        .contentType("application/json")
                        .content(updatedCourseRequestJson))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateCourse_whenLoggedInAndCourseNotExist_expectStatus404() throws Exception {
        String id = "1";

        CourseRequest updatedCourseRequest = new CourseRequest("Math", 22, null);
        String updatedCourseRequestJson = objectMapper.writeValueAsString(updatedCourseRequest);

        mockMvc.perform(put(BASE_URL + "/" + id)
                        .with(csrf())
                        .contentType("application/json")
                        .content(updatedCourseRequestJson))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteCourse_whenLoggedInAndCourseExist_expectStatus204() throws Exception {
        CourseRequest courseRequest = new CourseRequest("Math", 20, null);
        String courseRequestJson = objectMapper.writeValueAsString(courseRequest);

        MvcResult coursePostResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType("application/json")
                        .content(courseRequestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String coursePostResultBody = coursePostResult.getResponse().getContentAsString();
        Course createdCourse = objectMapper.readValue(coursePostResultBody, Course.class);

        mockMvc.perform(delete(BASE_URL + "/" + createdCourse.getId())
                        .with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteCourse_whenLoggedInAndCourseNotExist_expectStatus404() throws Exception {
        String id = "1";

        mockMvc.perform(delete(BASE_URL + "/" + id)
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void deleteCourse_whenNotLoggedIn_expectStatus401() throws Exception {
        String id = "1";

        mockMvc.perform(delete(BASE_URL + "/" + id)
                        .with(csrf()))
                .andExpect(status().isUnauthorized());
    }
}
