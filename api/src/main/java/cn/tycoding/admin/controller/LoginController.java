package cn.tycoding.admin.controller;

import ch.qos.logback.core.status.Status;
import cn.tycoding.admin.dto.Result;
import cn.tycoding.admin.dto.StatusCode;
import cn.tycoding.admin.entity.User;
import cn.tycoding.admin.enums.ResultEnums;
import cn.tycoding.admin.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
    public Result login(
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "remember", required = false) String remember) {
        if (username != null && password != null) {
            Subject subject = SecurityUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            if (remember != null) {
                if (remember.equals("true")) {
                    //说明选择了记住我
                    token.setRememberMe(true);
                } else {
                    token.setRememberMe(false);
                }
            } else {
                token.setRememberMe(false);
            }
            try {
                subject.login(token);
                System.out.println("是否登录：" + subject.isAuthenticated());
                Map map = new HashMap();
                map.put("token", subject.getPrincipal());
                return new Result(StatusCode.SUCCESS, map);
            } catch (UnknownAccountException e) {
                e.printStackTrace();
                return new Result(Status.ERROR, ResultEnums.LOGIN_UNKNOWN);
            } catch (IncorrectCredentialsException e) {
                e.printStackTrace();
                return new Result(StatusCode.ERROR, ResultEnums.LOGIN_ERROR);
            } catch (Exception e) {
                e.printStackTrace();
                return new Result(StatusCode.ERROR, ResultEnums.INNER_ERROR);
            }
        } else {
            return new Result(StatusCode.ERROR, ResultEnums.INPUT_ERROR);
        }
    }

    @RequestMapping(value = "/user/info", method = RequestMethod.GET)
    public Result getUserInfo(String token) {
        Subject subject = SecurityUtils.getSubject();
        try {
            User user = userService.findByName(token);
            if (user != null) {
                Map map = new HashMap();
                map.put("roles", new String[]{"admin"});
                map.put("name", user.getUsername());
                map.put("avatar", user.getAvatar());
                return new Result(StatusCode.SUCCESS, map);
            }
            return new Result(StatusCode.ERROR, ResultEnums.INNER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(StatusCode.ERROR, ResultEnums.INNER_ERROR);
        }
    }

    /**
     * 手动定义logout退出登录方法，因为Shiro提供的默认的`/logout`会退出到系统的根目录下即`localhost:8084`
     * @return
     */
    @RequestMapping(value = "/user/logout", method = RequestMethod.GET)
    public Result logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return new Result(StatusCode.SUCCESS, ResultEnums.SUCCESS);
    }

}
