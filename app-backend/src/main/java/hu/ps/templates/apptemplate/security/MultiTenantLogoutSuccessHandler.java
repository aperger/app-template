package hu.ps.templates.apptemplate.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import java.io.IOException;

@Slf4j
public class MultiTenantLogoutSuccessHandler implements LogoutSuccessHandler {

    private String keycloakLogoutUrl;
    private String msLogoutUrl;

    public MultiTenantLogoutSuccessHandler(String keycloakLogoutUrl, String msLogoutUrl) {
        this.msLogoutUrl = msLogoutUrl;
        this.keycloakLogoutUrl = keycloakLogoutUrl;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (authentication == null) {
            log.warn("Can not redirect to logout, because the `authentication` object is null");
            return;
        }

        String idTokenParam = "";
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        if (oauthToken.getPrincipal() instanceof OidcUser) {
            OidcUser oidcUser = (OidcUser) oauthToken.getPrincipal();
            idTokenParam = "&id%5Ftoken%5Fhint=" + oidcUser.getIdToken().getTokenValue();
        }
        String url = null;
        if ("MSLogin".equalsIgnoreCase(oauthToken.getAuthorizedClientRegistrationId())) {
            url = this.msLogoutUrl + idTokenParam;
            response.sendRedirect(url);
        } else if ("PSSecurity".equalsIgnoreCase(oauthToken.getAuthorizedClientRegistrationId())) {
            url = this.keycloakLogoutUrl + idTokenParam;
            response.sendRedirect(url);
        }
    }
}
