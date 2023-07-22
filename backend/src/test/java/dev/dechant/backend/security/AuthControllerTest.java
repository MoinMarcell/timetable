package dev.dechant.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DirtiesContext
    void testGetCsrfToken_whenCalled_expectStatus200AndBodyWithCsrfTokenNotNull() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/auth/csrf"))
                .andExpect(status().isOk())
                .andReturn();

        String body = result.getResponse().getContentAsString();

        assertNotNull(body);
    }

    @Test
    @WithMockUser(username = "username", password = "124")
    @DirtiesContext
    void testGetMeWithPrincipal_whenLoggedIn_expectStatus200AndBodyWithUsername() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/auth/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("username"));
    }

    @Test
    @DirtiesContext
    void testGetMe_whenNotLoggedIn_expectStatus200AndBodyWithAnonymous() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/auth/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymous"));
    }

    @Test
    @DirtiesContext
    void testGetMe_whenLoggedIn_expectStatus200AndBodyWithUsername() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/auth/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymous"));
    }

    @Test
    @DirtiesContext
    void testLogin_whenCredentialsNotCorrect_expectStatus401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/login").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testLogin_whenCredentialsCorrect_expectStatus200AndBodyOfLoggedIn() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/login").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("logged in"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testLogout_whenLoggedIn_expectStatus200AndBodyOfLoggedOut() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/logout").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("logged out"));
    }

    @Test
    @DirtiesContext
    void testLogout_whenNotLoggedIn_expectStatus401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/logout").with(csrf()))
                .andExpect(status().isUnauthorized());
    }
}
