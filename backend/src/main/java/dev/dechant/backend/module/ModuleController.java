package dev.dechant.backend.module;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/modules")
@RequiredArgsConstructor
public class ModuleController {

    public static final String MODULE_NOT_FOUND = "Module not found";
    private final ModuleRepository moduleRepository;

    @GetMapping
    public List<Module> getAllModules() {
        return moduleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Module getModuleById(@PathVariable String id) {
        return moduleRepository
                .findById(id)
                .orElseThrow(() -> new ModuleNotFoundException(MODULE_NOT_FOUND));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Module createModule(@Valid @RequestBody ModuleRequest module) {
        return moduleRepository.save(
                Module.builder()
                        .name(module.name())
                        .title(module.title())
                        .description(module.description())
                        .build()
        );
    }

    @PutMapping("/{id}")
    public Module updateModule(@PathVariable String id, @RequestBody ModuleRequest module) {
        Module moduleToUpdate = moduleRepository
                .findById(id)
                .orElseThrow(() -> new ModuleNotFoundException(MODULE_NOT_FOUND));

        moduleToUpdate.setName(module.name());
        moduleToUpdate.setTitle(module.title());
        moduleToUpdate.setDescription(module.description());

        return moduleRepository.save(moduleToUpdate);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteModule(@PathVariable String id) {
        Module moduleToDelete = moduleRepository
                .findById(id)
                .orElseThrow(() -> new ModuleNotFoundException(MODULE_NOT_FOUND));
        moduleRepository.delete(moduleToDelete);
    }

}
