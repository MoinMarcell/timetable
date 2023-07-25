package dev.dechant.backend.module;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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
class ModuleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String BASE_URL = "/api/v1/modules";

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllModules_whenLoggedInAndDatabaseIsEmpty_expectStatus200AndReturnEmptyList() throws Exception {
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllModules_whenLoggedInAndDatabaseIsNotEmpty_expectStatus200AndReturnListOfStudents() throws Exception {

        ModuleRequest moduleRequest = new ModuleRequest("name", "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        MvcResult postModuleResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String postModuleResultJson = postModuleResult.getResponse().getContentAsString();
        Module module = objectMapper.readValue(postModuleResultJson, Module.class);

        List<Module> expectedModules = List.of(module);
        String expectedModulesJson = objectMapper.writeValueAsString(expectedModules);

        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(expectedModulesJson));
    }

    @Test
    @DirtiesContext
    void getAllModules_whenNotLoggedIn_expectStatus401() throws Exception {
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getModuleById_whenLoggedInAndModuleExist_ExpectStatus200AndReturnModule() throws Exception {
        ModuleRequest moduleRequest = new ModuleRequest("name", "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        MvcResult postModuleResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String postModuleResultJson = postModuleResult.getResponse().getContentAsString();
        Module module = objectMapper.readValue(postModuleResultJson, Module.class);

        mockMvc.perform(get(BASE_URL + "/" + module.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(postModuleResultJson));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getModuleById_whenLoggedInAndModuleNotExist_ExpectStatus404() throws Exception {
        String id = "1";

        mockMvc.perform(get(BASE_URL + "/" + id))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void getModuleById_whenNotLoggedIn_ExpectStatus401() throws Exception {
        String id = "1";

        mockMvc.perform(get(BASE_URL + "/" + id))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createModule_whenLoggedInAndRequestBodyIsCorrect_expectStatus201AndReturnCreatedModul() throws Exception {
        ModuleRequest moduleRequest = new ModuleRequest("name", "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        MvcResult postModuleResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String postModuleResultJson = postModuleResult.getResponse().getContentAsString();
        Module module = objectMapper.readValue(postModuleResultJson, Module.class);

        assertEquals(moduleRequest.name(), module.getName());
        assertEquals(moduleRequest.title(), module.getTitle());
        assertEquals(moduleRequest.description(), module.getDescription());
        assertNotNull(module.getId());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createModule_whenLoggedInAndCsrfTokenIsMissingOrIncorrect_expectStatus403() throws Exception {
        ModuleRequest moduleRequest = new ModuleRequest("name", "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isForbidden());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createModule_whenLoggedInAndRequestBodyIsMissingOrIncorrect_expectStatus400() throws Exception {
        ModuleRequest moduleRequest = new ModuleRequest(null, "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void createModule_whenNotLoggedIn_expectStatus401() throws Exception {
        ModuleRequest moduleRequest = new ModuleRequest("name", "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateModule_whenLoggedInAndModuleExist_expectStatus200AndReturnUpdatedModule() throws Exception {
        ModuleRequest moduleRequest = new ModuleRequest("name", "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        MvcResult postModuleResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String postModuleResultJson = postModuleResult.getResponse().getContentAsString();
        Module module = objectMapper.readValue(postModuleResultJson, Module.class);

        ModuleRequest moduleRequestUpdate = new ModuleRequest("nameUpdate", "titleUpdate", "descriptionUpdate");
        String moduleRequestUpdateJson = objectMapper.writeValueAsString(moduleRequestUpdate);

        MvcResult putModuleResult = mockMvc.perform(put(BASE_URL + "/" + module.getId())
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestUpdateJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String putModuleResultJson = putModuleResult.getResponse().getContentAsString();
        Module moduleUpdate = objectMapper.readValue(putModuleResultJson, Module.class);

        assertEquals(moduleRequestUpdate.name(), moduleUpdate.getName());
        assertEquals(moduleRequestUpdate.title(), moduleUpdate.getTitle());
        assertEquals(moduleRequestUpdate.description(), moduleUpdate.getDescription());
        assertEquals(module.getId(), moduleUpdate.getId());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateModule_whenLoggedInAndModuleExistAndCsrfTokenIsMissingOrIncorrect_expectStatus403() throws Exception {
        ModuleRequest moduleRequest = new ModuleRequest("name", "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        MvcResult postModuleResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String postModuleResultJson = postModuleResult.getResponse().getContentAsString();
        Module module = objectMapper.readValue(postModuleResultJson, Module.class);

        ModuleRequest moduleRequestUpdate = new ModuleRequest("nameUpdate", "titleUpdate", "descriptionUpdate");
        String moduleRequestUpdateJson = objectMapper.writeValueAsString(moduleRequestUpdate);

        mockMvc.perform(put(BASE_URL + "/" + module.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestUpdateJson))
                .andExpect(status().isForbidden());
    }

    @Test
    @DirtiesContext
    void updateModule_whenNotLoggedIn_expectStatus401() throws Exception {
        String id = "1";
        ModuleRequest moduleRequestUpdate = new ModuleRequest("nameUpdate", "titleUpdate", "descriptionUpdate");
        String moduleRequestUpdateJson = objectMapper.writeValueAsString(moduleRequestUpdate);

        mockMvc.perform(put(BASE_URL + "/" + id)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestUpdateJson))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateModule_whenLoggedAndModuleNotExist_expectStatus404() throws Exception {
        String id = "1";
        ModuleRequest moduleRequestUpdate = new ModuleRequest("nameUpdate", "titleUpdate", "descriptionUpdate");
        String moduleRequestUpdateJson = objectMapper.writeValueAsString(moduleRequestUpdate);

        mockMvc.perform(put(BASE_URL + "/" + id)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestUpdateJson))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteModule_whenLoggedInAndModuleExist_expectStatus204() throws Exception {
        ModuleRequest moduleRequest = new ModuleRequest("name", "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        MvcResult postModuleResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String postModuleResultJson = postModuleResult.getResponse().getContentAsString();
        Module module = objectMapper.readValue(postModuleResultJson, Module.class);

        mockMvc.perform(delete(BASE_URL + "/" + module.getId())
                        .with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteModule_whenLoggedInAndModuleNotExist_expectStatus404() throws Exception {
        String id = "1";

        mockMvc.perform(delete(BASE_URL + "/" + id)
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void deleteModule_whenNotLoggedIn_expectStatus401() throws Exception {
        String id = "1";

        mockMvc.perform(delete(BASE_URL + "/" + id)
                        .with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    void deleteModule_whenNotLoggedInAndCsrfTokenIsMissingOrNotCorrect_expectStatus403() throws Exception {
        String id = "1";

        mockMvc.perform(delete(BASE_URL + "/" + id))
                .andExpect(status().isForbidden());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteModule_whenLoggedInAndModuleExistAndCsrfTokenIsMissingOrNotCorrect_expectStatus403() throws Exception {
        ModuleRequest moduleRequest = new ModuleRequest("name", "title", "description");
        String moduleRequestJson = objectMapper.writeValueAsString(moduleRequest);

        MvcResult postModuleResult = mockMvc.perform(post(BASE_URL)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(moduleRequestJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String postModuleResultJson = postModuleResult.getResponse().getContentAsString();
        Module module = objectMapper.readValue(postModuleResultJson, Module.class);

        mockMvc.perform(delete(BASE_URL + "/" + module.getId()))
                .andExpect(status().isForbidden());
    }
}