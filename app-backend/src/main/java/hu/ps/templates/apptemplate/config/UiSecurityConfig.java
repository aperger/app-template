package hu.ps.templates.apptemplate.config;
/*
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class UiSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .requestMatchers("/favicon.ico").permitAll()
                .requestMatchers("/*.js").permitAll()
                .requestMatchers("/*.css").permitAll()
                .requestMatchers("/*.jpg").permitAll()
                .requestMatchers("/*.png").permitAll()
                .requestMatchers("/*.woff2").permitAll()
                .requestMatchers("/*.woff").permitAll()
                .requestMatchers("/*.ttf").permitAll()
                .requestMatchers("/css/**").permitAll()
                .requestMatchers("/js/**").permitAll()
                .requestMatchers("/img/**").permitAll()
                .requestMatchers("/imgs/**").permitAll()
                .requestMatchers("/assets/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login();
        return http.build();
    }

}
*/