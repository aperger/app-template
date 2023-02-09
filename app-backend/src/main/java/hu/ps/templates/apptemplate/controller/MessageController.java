package hu.ps.templates.apptemplate.controller;

import hu.ps.templates.apptemplate.proxy.ResourceServerProxy;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/messages")
public class MessageController {

    private ResourceServerProxy resourceServer1;

    public MessageController(@Qualifier("resourceServer1") ResourceServerProxy resourceServer1) {
        this.resourceServer1 = resourceServer1;
    }

    @GetMapping("/welcome")
    public ResponseEntity<String> getWelcomeMessage(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient client) {
        return resourceServer1.callEndPoint(client, "/api/message/welcome", String.class);
    }


}
