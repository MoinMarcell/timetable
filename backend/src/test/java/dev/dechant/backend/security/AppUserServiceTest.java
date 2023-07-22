package dev.dechant.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AppUserServiceTest {

    private final AppUserRepository appUserRepository = mock(AppUserRepository.class);
    private final AppUserService appUserService = new AppUserService(appUserRepository);

    @Test
    void loadUserByUsername_whenUserExist_returnUserDetails() {
        //Given
        String username = "test";
        AppUser expected = AppUser.builder()
                .id("1")
                .username(username)
                .password("password")
                .build();

        //When
        when(appUserRepository.findByUsername(username)).thenReturn(java.util.Optional.of(expected));
        UserDetails actual = appUserService.loadUserByUsername(username);

        //Then
        assertNotNull(actual);
        assertEquals(expected, actual);
    }

    @Test
    void loadUserByUsername_whenUserNotExist_throwUsernameNotFoundException() {
        //Given
        String username = "test";

        //When
        when(appUserRepository.findByUsername(username)).thenReturn(java.util.Optional.empty());

        //Then
        assertThrows(UsernameNotFoundException.class, () -> appUserService.loadUserByUsername(username));
    }
}