package com.example.module_user.controller;




import com.example.module_user.model.User;
import com.example.module_user.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // TEST INSERT
    @GetMapping("/add")
    @ResponseBody
    public String addUser() {
        User user = new User();
        user.setUsername("test");
        user.setPassword("123");
        user.setEmail("test@gmail.com");
        user.setFullName("Test User");
//        user.setRoleId(1L);

        userService.save(user);
        return "Inserted!";
    }

    // TEST SELECT + VIEW
    @GetMapping("/users")
    public String getUsers(Model model) {
        model.addAttribute("users", userService.getAll());
        return "users";
    }


}