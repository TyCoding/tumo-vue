package cn.tycoding.common.constants;

/**
 * 项目公共常量数据
 *
 * @author tycoding
 * @date 2019-09-09
 */
public interface CommonConstant {

    /**
     * 前后端分离，前端携带的Token标识
     */
    String AUTHORIZATION = "Authorization";

    String REFERENCED_SESSION_ID_SOURCE = "Stateless request";

    /**
     * 成功标记
     */
    int SUCCESS = 200;

    /**
     * 错误标记
     */
    int ERROR = 500;

    /**
     * UTF-8编码
     */
    String UTF8 = "UTF-8";

    /**
     * 文章已发布状态标识：1
     */
    String DEFAULT_RELEASE_STATUS = "1";

    /**
     * 文章未发布状态标识：1
     */
    String DEFAULT_DRAFT_STATUS = "0";

    /**
     * User_Agent
     */
    String USER_AGENT = "User-Agent";
}
