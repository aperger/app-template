package hu.ps.templates.apptemplate.config;

import hu.ps.templates.apptemplate.security.MultiTenantLogoutSuccessHandler;
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

    @Value("${app.url:#{null}}")
    private String applicationUrl;

    @Value("${keycloak.realm:#{null}}")
    private String keyCloakRealm;


    @Value("${spring.security.oauth2.client.registration.MSLogin.client-id:#{null}}")
    private String msClientId;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        final String keycloakLogoutUrl = keyCloakRealm + "/protocol/openid-connect/logout?redirect_uri=" + applicationUrl + "/login";

        final String msLogoutUrl =  "https://login.microsoftonline.com/common/oauth2/logout?"
                + "client%5Fid=" + msClientId + "&response%5Fmode=form%5Fpost"
                + "&post%5Flogout%5Fredirect%5Furi=" + applicationUrl + "/login";

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
                .logoutSuccessHandler(new MultiTenantLogoutSuccessHandler(keycloakLogoutUrl, msLogoutUrl))
            ;
        return http.build();
    }

}
