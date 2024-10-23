package com.lon60.keycloakspringboottemplate.demo;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DemoController {

    @GetMapping("/public")
    public String publicEndpoint() {
        return "Public endpoint - no authentication required.";
    }

    @GetMapping("/secured")
    @PreAuthorize("hasAuthority('access_user_endpoints')")
    public String securedEndpoint() {
        return "Secured endpoint - authentication required.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('access_admin_endpoints')")
    public String adminEndpoint() {
        return "Admin endpoint - admin access required.";
    }
}
