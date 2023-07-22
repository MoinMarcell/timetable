package dev.dechant.backend.teacher;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TeacherControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String API_URL = "/api/v1/teachers";

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllTeachers_whenNoTeachersInDatabase_expectStatus200AndEmptyList() throws Exception {
        mockMvc.perform(get(API_URL))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllTeachers_whenTeachersInDatabase_expectStatus200AndListOfTeachers() throws Exception {
        List<TeacherRequest> teachersToAdd = List.of(
                new TeacherRequest("Max", "Muster", "Herr"),
                new TeacherRequest("Lisa", "Jane", "Frau")
        );
        String teachersToAddAsJson = objectMapper.writeValueAsString(teachersToAdd);

        MvcResult mvcResult = mockMvc.perform(post(API_URL + "/multiple")
                        .contentType("application/json")
                        .content(teachersToAddAsJson)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andReturn();

        String body = mvcResult.getResponse().getContentAsString();
        List<Teacher> teachers = objectMapper.readValue(body, new TypeReference<>() {
        });

        mockMvc.perform(get(API_URL))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(teachers)));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getTeacherById_whenTeacherExist_expectStatus200AndReturnTeacher() throws Exception {
        TeacherRequest teacherToAdd = new TeacherRequest("Max", "Muster", "Herr");
        String teacherToAddAsJson = objectMapper.writeValueAsString(teacherToAdd);

        MvcResult mvcResult = mockMvc.perform(post(API_URL)
                        .contentType("application/json")
                        .content(teacherToAddAsJson)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andReturn();

        String body = mvcResult.getResponse().getContentAsString();
        Teacher teacher = objectMapper.readValue(body, Teacher.class);

        mockMvc.perform(get(API_URL + "/" + teacher.getId()))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(teacher)));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getTeacherById_whenTeacherNotExist_expectStatus404() throws Exception {
        String id = "1";

        mockMvc.perform(get(API_URL + "/" + id))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createTeacher_whenRequestBodyIsCorrect_expectStatus201AndCreatedTeacher() throws Exception {
        TeacherRequest teacherToAdd = new TeacherRequest("Max", "Muster", "Herr");
        String teacherToAddAsJson = objectMapper.writeValueAsString(teacherToAdd);

        MvcResult result = mockMvc.perform(post(API_URL)
                        .contentType("application/json")
                        .content(teacherToAddAsJson)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andReturn();

        String body = result.getResponse().getContentAsString();
        Teacher teacher = objectMapper.readValue(body, Teacher.class);

        assertEquals(teacherToAdd.firstName(), teacher.getFirstName());
        assertEquals(teacherToAdd.lastName(), teacher.getLastName());
        assertEquals(teacherToAdd.salutation(), teacher.getSalutation());
        assertNotNull(teacher.getId());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateTeacher_whenTeacherExistAndRequestBodyIsCorrect_expectStatus200AndUpdatedTeacher() throws Exception {
        TeacherRequest teacherToAdd = new TeacherRequest("Max", "Muster", "Herr");
        String teacherToAddAsJson = objectMapper.writeValueAsString(teacherToAdd);

        TeacherRequest teacherToUpdate = new TeacherRequest("Max", "Mustermann", "Herr");
        String teacherToUpdateAsJson = objectMapper.writeValueAsString(teacherToUpdate);

        MvcResult postResult = mockMvc.perform(post(API_URL)
                        .contentType("application/json")
                        .content(teacherToAddAsJson)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andReturn();

        String bodyOfSavedTeacher = postResult.getResponse().getContentAsString();
        Teacher savedTeacher = objectMapper.readValue(bodyOfSavedTeacher, Teacher.class);

        MvcResult updateResult = mockMvc.perform(put(API_URL + "/" + savedTeacher.getId())
                        .contentType("application/json")
                        .content(teacherToUpdateAsJson)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        String bodyOfUpdatedTeacher = updateResult.getResponse().getContentAsString();
        Teacher updatedTeacher = objectMapper.readValue(bodyOfUpdatedTeacher, Teacher.class);

        assertEquals(savedTeacher.getId(), updatedTeacher.getId());
        assertEquals(teacherToUpdate.firstName(), updatedTeacher.getFirstName());
        assertEquals(teacherToUpdate.lastName(), updatedTeacher.getLastName());
        assertEquals(teacherToUpdate.salutation(), updatedTeacher.getSalutation());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteTeacher_whenTeacherExist_expectStatus204() throws Exception {
        TeacherRequest teacherToAdd = new TeacherRequest("Max", "Muster", "Herr");
        String teacherToAddAsJson = objectMapper.writeValueAsString(teacherToAdd);

        MvcResult postResult = mockMvc.perform(post(API_URL)
                        .contentType("application/json")
                        .content(teacherToAddAsJson)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andReturn();

        String bodyOfSavedTeacher = postResult.getResponse().getContentAsString();
        Teacher savedTeacher = objectMapper.readValue(bodyOfSavedTeacher, Teacher.class);

        mockMvc.perform(delete(API_URL + "/" + savedTeacher.getId())
                        .with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createTeachers_whenApiCalledAndRequestBodyIsCorrect_expectStatus201AndReturnListOfCreatedTeachers() throws Exception {
        List<TeacherRequest> teachersToAdd = List.of(
                new TeacherRequest("Max", "Muster", "Herr"),
                new TeacherRequest("Lisa", "Jane", "Frau")
        );
        String teachersToAddAsJson = objectMapper.writeValueAsString(teachersToAdd);

        MvcResult mvcResult = mockMvc.perform(post(API_URL + "/multiple")
                        .contentType("application/json")
                        .content(teachersToAddAsJson)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andReturn();

        String body = mvcResult.getResponse().getContentAsString();
        List<Teacher> teachers = objectMapper.readValue(body, new TypeReference<>() {
        });

        assertEquals(teachersToAdd.size(), teachers.size());
        for (int i = 0; i < teachersToAdd.size(); i++) {
            assertEquals(teachersToAdd.get(i).firstName(), teachers.get(i).getFirstName());
            assertEquals(teachersToAdd.get(i).lastName(), teachers.get(i).getLastName());
            assertEquals(teachersToAdd.get(i).salutation(), teachers.get(i).getSalutation());
            assertNotNull(teachers.get(i).getId());
        }
    }
}