package cn.tycoding.common.properties;

import lombok.Data;

/**
 * @author tycoding
 * @date 2019-09-20
 */
@Data
public class ShiroProperties {

    private long sessionTimeout;
    private int cookieTimeout;
    private String anonUrl;
}
