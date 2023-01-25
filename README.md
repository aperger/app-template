# Web Application template 
### The application is secured with Spring Boot OAuth 2.0 client
##### (Angular frontend - Spring Boot backend)

Sample application secured with OAuth 2.0/OpenID.

The build

- The Angular frontend (`app-frontend`) is built into JAR file (`mvn -U clean install`)
  - configured with `frontend-maven-plugin` and `maven-resources-plugin`
  - the `index.html` is moved into `/src/main/resources/templates` subdirectory
  - the rest of the distributable files of compiled Angular project are moved into `/src/main/resources/static` subdirectory
  - `app-backend` project imports these files as JAR (contains only resources) and use Thymeleaf (`spring-boot-starter-thymeleaf`) to access the resource as view (called `index`)
- benefit of this build: the Angular frontend (static) and the Spring Boot application (responsible for security) is bundled into a single deployable solution. Not need to deploy these two project separately (as WebApplication and Static WebApplication)
- The API endpoint is an external micro-service (https://github.com/aperger/service-template)
  - we can access to these resources with access token which is served by the authorization server
- a GitHub action is responsible to deploy the service into Azure,
  the event is starting when we push changes into `main` branch 

It is possible to run this application locally:
 - The URL of authorization server need change
 - you can set the client id and client secret as environment variable. 

```yaml
keycloak:
  realm: https://<keycloak-authorizton-server>/auth/realms/<real-name>
  account: ${keycloak.realm}/account
  application-url: http://localhost:8080
  

spring:
  security:
    oauth2:
      client:
        registration:
          PSSecurity:
            client-id: ${OAUTH_CLIENT_ID}
            client-secret: ${OAUTH_CLIENT_SECRET}
```

When you execute the application locally (configuration changes are required):
- you need to start `app-backend` project which will be available on http://localhost:8080
- you need to login
- stat the resource server (https://github.com/aperger/service-template) which will be available on http://localhost:8081
- you can start the Angular project as usual, you can acess to it on http://localhost:4200
- then you can start your development process on the Angular project

The deployed version is available here:
- https://ps-app-template.azurewebsites.net/login
- not all the time is available, sorry :-(

The application uses this resource server is:
- https://github.com/aperger/service-template