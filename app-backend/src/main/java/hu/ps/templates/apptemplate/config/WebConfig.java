package hu.ps.templates.apptemplate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        final String[] allowedOrigins = {
                "http://localhost", "http://127.0.0.1",
                "http://localhost:8080", "http://127.0.0.1:8080",
                "http://localhost:4200", "http://127.0.0.1:4200"
        };
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedHeaders("*")
                .allowCredentials(true).allowedMethods("*");
    }
}
