package hu.ps.templates.apptemplate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping(value = {
            "/",
            "/home",
            "!/api/**",
            "/error404",
            "/access-denied"
    })
    public String getLoginPage(Model model) {
        return "index";
    }
}
