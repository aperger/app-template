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
@RequestMapping("/api/message")
public class MessageController {

    private ResourceServerProxy resourceServer1;

    private ResourceServerProxy resourceServer2;

    public MessageController(@Qualifier("resourceServer1") ResourceServerProxy resourceServer1,
                             @Qualifier("resourceServer2") ResourceServerProxy resourceServer2) {
        this.resourceServer1 = resourceServer1;
        this.resourceServer2 = resourceServer2;
    }

    @GetMapping("/welcome1")
    public ResponseEntity<String> getWelcomeMessage1(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient client) {
        return resourceServer1.callEndPoint(client, "/api/message/welcome", String.class);
    }

    @GetMapping("/welcome2")
    public ResponseEntity<String> getWelcomeMessage2(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient client) {
        return resourceServer2.callEndPoint(client, "/api/message/welcome", String.class);
    }


}
