package cn.tycoding.admin.enums;

import cn.tycoding.admin.dto.StatusCode;

/**
 * @auther TyCoding
 * @date 2018/10/16
 */
public enum ModifyEnums {

    SUCCESS("操作成功", StatusCode.OK),
    ERROR("操作失败", StatusCode.ERROR),
    INNER_ERROR("系统发生异常", StatusCode.ERROR),
    INPUT_ERROR("输入信息有误", StatusCode.ERROR),
    LOGIN_SUCCESS("登录成功", StatusCode.OK),
    LOGIN_UNKNOWN("账户不存在", StatusCode.ERROR),
    LOGIN_ERROR("用户名或密码错误", StatusCode.LOGINERROR),
    LOGIN_CHECK_ERROR("输入的旧密码不匹配", StatusCode.LOGINERROR);

    private String info;
    private int code;

    public String getInfo() {
        return info;
    }

    public int getCode() {
        return code;
    }

    ModifyEnums(String info, int code) {
        this.info = info;
        this.code = code;
    }
}
