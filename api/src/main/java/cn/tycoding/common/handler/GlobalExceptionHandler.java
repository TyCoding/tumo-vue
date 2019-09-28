package cn.tycoding.common.handler;

import cn.tycoding.common.constants.CommonConstant;
import cn.tycoding.common.exception.GlobalException;
import cn.tycoding.common.utils.R;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.session.ExpiredSessionException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器
 *
 * @author tycoding
 * @date 2019-03-09
 */
@Slf4j
@RestControllerAdvice
@Order(value = Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public R exception(Exception e) {
        e.printStackTrace();
        return new R(e);
    }

    @ExceptionHandler(value = GlobalException.class)
    public R globalExceptionHandle(GlobalException e) {
        e.printStackTrace();
        return new R<>(CommonConstant.ERROR, e.getMsg());
    }

    @ExceptionHandler(value = UnauthorizedException.class)
    public R handleUnauthorizedException(UnauthorizedException e) {
        log.debug("UnauthorizedException", e);
        return new R<>(HttpStatus.FORBIDDEN, e.getMessage());
    }

    @ExceptionHandler(value = AuthenticationException.class)
    public R handleAuthenticationException(AuthenticationException e) {
        log.debug("AuthenticationException", e);
        return new R<>(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    }

    @ExceptionHandler(value = AuthorizationException.class)
    public R handleAuthorizationException(AuthorizationException e) {
        log.debug("AuthorizationException", e);
        return new R<>(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler(value = ExpiredSessionException.class)
    public R handleExpiredSessionException(ExpiredSessionException e) {
        log.debug("ExpiredSessionException", e);
        return new R<>(HttpStatus.UNAUTHORIZED, e.getMessage());
    }
}
