package tumo.tycoding.admin.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tumo.tycoding.admin.dto.ModifyResult;
import tumo.tycoding.admin.dto.PageBean;
import tumo.tycoding.admin.entity.User;
import tumo.tycoding.admin.enums.ModifyEnums;
import tumo.tycoding.admin.service.UserService;

/**
 * @auther TyCoding
 * @date 2018/10/18
 */
@RestController
@SuppressWarnings("all")
@RequestMapping("/user")
public class UserController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserService userService;

    /**
     * 分页查询
     *
     * @param comments 查询条件
     * @param pageCode 当前页
     * @param pageSize 每页显示的记录数
     * @return
     */
    @RequestMapping("/findByPage")
    public PageBean findByPage(User user,
                               @RequestParam(value = "pageCode", required = false) Integer pageCode,
                               @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        return userService.findByPage(user, pageCode, pageSize);
    }

    @RequestMapping("/findById")
    public User findById(@RequestParam("id") Long id) {
        return userService.findById(id);
    }

    @RequestMapping("/save")
    public ModifyResult save(@RequestBody User user) {
        try {
            userService.save(user);
            return new ModifyResult(true, ModifyEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new ModifyResult(false, e.getMessage());
        }
    }

//    @RequestMapping("/update")
//    public ModifyResult update(@RequestBody User user) {
//        try {
//            if (user != null) {
//                if (user.getPassword() != null && !"".equals(user.getPassword()) && user.getCheckPass() != null && !"".equals(user.getCheckPass())) {
//                    //说明是更新密码操作
//                    User u = userService.findByName((String) SecurityUtils.getSubject().getPrincipal());
//                    u.setCheckPass(user.getPassword()); // 设置u.checkPass=旧密码
//                    user.setSalt(u.getSalt()); // 设置user盐值
//                    user.setPassword(user.getCheckPass()); // 设置user.password=旧密码
//                    passwordHelper.encryptPassword(user); // 将新输入的密码加密
//                    if (!u.getPassword().equals(user.getPassword())) {
//                        logger.info("输入的旧密码不匹配：new:" + user.getPassword() + ", old:" + u.getPassword());
//                        return new ModifyResult(false, ModifyEnums.LOGIN_CHECK_ERROR);
//                    } else {
//                        logger.info("输入的旧密码匹配，执行更新操作");
//                        // 2.3 replace checkPassword and password
//                        logger.info(u.getCheckPass());
//                        user.setPassword(u.getCheckPass()); // new
//                        // check success
//                        userService.update(user);
//                    }
//                } else {
//                    userService.update(user);
//                }
//                return new ModifyResult(true, ModifyEnums.SUCCESS);
//            } else {
//                return new ModifyResult(false, ModifyEnums.ERROR);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ModifyResult(false, e.getMessage());
//        }
//    }

    @RequestMapping("/delete")
    public ModifyResult delete(@RequestBody Long... ids) {
        try {
            userService.delete(ids);
            return new ModifyResult(true, ModifyEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new ModifyResult(false, e.getMessage());
        }
    }

//    @RequestMapping("/getUserInfo")
//    public User getUserInfo() {
//        Subject subject = SecurityUtils.getSubject();
//        String username = (String) subject.getPrincipal();
//        User user = userService.findByName(username);
//        return user;
//    }

//    /**
//     * 手动定义logout退出登录方法，因为Shiro提供的默认的`/logout`会退出到系统的根目录下即`localhost:8084`
//     * @return
//     */
//    @RequestMapping("/logout")
//    public String logout() {
//        Subject subject = SecurityUtils.getSubject();
//        subject.logout();
//        return "redirect:/login";
//    }
}
