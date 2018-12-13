package tumo.tycoding.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tumo.tycoding.admin.dto.ModifyResult;
import tumo.tycoding.admin.enums.ModifyEnums;
import tumo.tycoding.admin.service.UserService;

/**
 * @auther TyCoding
 * @date 2018/10/3
 */
@RestController
@SuppressWarnings("all")
public class LoginController {

    @Autowired
    private UserService userService;

    @RequestMapping("/admin/login")
    public ModifyResult login(
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "remember", required = false) String remember) {
        if (username != null && password != null) {
        } else {
            return new ModifyResult(false, ModifyEnums.INPUT_ERROR);
        }
    }


}
