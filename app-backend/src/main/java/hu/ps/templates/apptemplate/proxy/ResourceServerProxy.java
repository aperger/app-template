package hu.ps.templates.apptemplate.proxy;

import lombok.val;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.web.client.RestTemplate;


public class ResourceServerProxy {

    public static final String AUTHORIZATION = "Authorization";

    private String resourceServerURL;

    private final RestTemplate restTemplate;
    public ResourceServerProxy(
            String resourceServerURL,
            RestTemplate restTemplate) {
        this.resourceServerURL = resourceServerURL;
        this.restTemplate = restTemplate;
    }

    public <T> ResponseEntity<T> callEndPoint(OAuth2AuthorizedClient client, String relativeApiUrl, Class<T> clazz) {
        String token = client.getAccessToken().getTokenValue();

        String url = resourceServerURL + relativeApiUrl;

        HttpHeaders headers = new HttpHeaders();
        headers.add(AUTHORIZATION, "Bearer " + token);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, request, clazz);
    }
}
