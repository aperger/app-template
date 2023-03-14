package hu.ps.templates.apptemplate.config;

import hu.ps.templates.apptemplate.proxy.ResourceServerProxy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceServerConfig implements WebMvcConfigurer {

    @Value("${api.resource1}")
    private String resourceServer1URL;

    @Value("${api.resource2}")
    private String resourceServer2URL;

    @Bean(name = "resourceServer1")
    public ResourceServerProxy resourceServer1(RestTemplate restTemplate) {
        return new ResourceServerProxy(resourceServer1URL, restTemplate);
    }

    @Bean(name = "resourceServer2")
    public ResourceServerProxy resourceServer2(RestTemplate restTemplate) {
        return new ResourceServerProxy(resourceServer2URL, restTemplate);
    }
}
