package hu.ps.templates.apptemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController()
public class UserInfoController {

    @GetMapping("/profile/me")
    public ResponseEntity<Map<String, Object>> getUserProfile(Authentication authentication) {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        if (oauthToken == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        var result = new HashMap<String, Object>();
        result.put("username", oauthToken.getName());
        result.put("email", oauthToken.getPrincipal().getAttributes().get("email"));
        String locale = oauthToken.getPrincipal().getAttributes().get("locale").toString();
        var given_name = oauthToken.getPrincipal().getAttributes().get("given_name");
        var family_name = oauthToken.getPrincipal().getAttributes().get("family_name");
        var fullName = "hu".equalsIgnoreCase(locale) ? family_name + " " + given_name : given_name + ", " + family_name;
        result.put("fullName", fullName);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/profile/token")
    public ResponseEntity<Map<String, Object>> getUserAccessToken(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient client) {
        if (client == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        String token = client.getAccessToken().getTokenValue();
        var expires = client.getAccessToken().getExpiresAt();
        var result = new HashMap<String, Object>();
        result.put("accessToken", token);
        result.put("tokenExpires", expires);
        return ResponseEntity.ok(result);
    }
}
