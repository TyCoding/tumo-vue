package cn.tycoding.common.auth;

import cn.tycoding.common.constants.CommonConstant;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.Serializable;

/**
 * 自定义SessionManager。拦截前端请求，判断Token信息等
 *
 * @author tycoding
 * @date 2020/6/27
 */
public class AuthSessionManager extends DefaultWebSessionManager {

    public AuthSessionManager() {
        super();
    }

    @Override
    protected Serializable getSessionId(ServletRequest request, ServletResponse response) {
        // 获取请求头Header中的Token，登录时定义了Token = SessionID
        String token = WebUtils.toHttp(request).getHeader(CommonConstant.AUTHORIZATION);
        if (!StringUtils.isEmpty(token)) {
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID, token);
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID_IS_VALID, Boolean.TRUE);
            return token;
        } else {
            // 否则按默认从Cookie中获取JSESSIONID
            return super.getSessionId(request, response);
        }
    }
}
