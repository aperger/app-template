package hu.ps.templates.apptemplate.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * https://medium.com/@bcarunmail/securing-rest-api-using-keycloak-and-spring-oauth2-6ddf3a1efcc2
 * https://developers.redhat.com/articles/2022/12/07/how-implement-single-sign-out-keycloak-spring-boot#keycloak_configuration
 */
@Configuration
@EnableWebSecurity
public class UiSecurityConfig {

    @Value("${keycloak.application-url}")
    private String applicationUrl;

    @Value("${keycloak.realm}")
    private String keyCloakRealm;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        final String successLogoutUrl = keyCloakRealm + "/protocol/openid-connect/logout?redirect_uri=" + applicationUrl + "/login";

        http.cors().and().authorizeHttpRequests()
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
                .requestMatchers("/actuator/health**").permitAll()
                .anyRequest().authenticated()
                .and()
                    .oauth2Login()
                .and()
                    .logout()
                .logoutSuccessUrl(successLogoutUrl)
            ;
        return http.build();
    }

}
