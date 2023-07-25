package dev.dechant.backend.module;

import jakarta.validation.constraints.NotBlank;

public record ModuleRequest(

        @NotBlank
        String name,
        @NotBlank
        String title,
        @NotBlank
        String description
) {
}
