package cn.tycoding.system.controller;

import cn.tycoding.common.annotation.Log;
import cn.tycoding.common.constants.CommonConstant;
import cn.tycoding.common.constants.SiteConstant;
import cn.tycoding.common.controller.BaseController;
import cn.tycoding.common.exception.GlobalException;
import cn.tycoding.common.utils.AddressUtil;
import cn.tycoding.common.utils.IPUtil;
import cn.tycoding.common.utils.QueryPage;
import cn.tycoding.common.utils.R;
import cn.tycoding.system.entity.SysComment;
import cn.tycoding.system.service.CommentService;
import eu.bitwalker.useragentutils.Browser;
import eu.bitwalker.useragentutils.OperatingSystem;
import eu.bitwalker.useragentutils.UserAgent;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

/**
 * @author TyCoding
 * @date 2018/10/17
 */
@RestController
@RequestMapping("/api/comment")
@Api(value = "CommentController", tags = {"评论管理接口"})
public class CommentController extends BaseController {

    @Autowired
    private CommentService commentService;

    /**
     * 查询最新的8条评论
     *
     * @return
     */
    @GetMapping("/findAll")
    public R findAll() {
        return new R<>(commentService.findAll());
    }

    @GetMapping("/listForArticle")
    public R listForArticle(@RequestParam(name = "articleId") String articleId,
                            @RequestParam(name = "page", required = false) String page) {
        if (page == null || page == "") {
            page = "1";
        }
        QueryPage queryPage = new QueryPage(Integer.valueOf(page), SiteConstant.COMMENT_PAGE_LIMIT);
        Map<String, Object> map = commentService.findCommentsList(queryPage, articleId, SiteConstant.COMMENT_SORT_ARTICLE);
        return new R<>(map);
    }

    @GetMapping("/listForLink")
    public R listForLink(@RequestParam(name = "page", required = false) String page) {
        if (page == null || page == "") {
            page = "1";
        }
        QueryPage queryPage = new QueryPage(Integer.valueOf(page), SiteConstant.COMMENT_PAGE_LIMIT);
        Map<String, Object> map = commentService.findCommentsList(queryPage, null, SiteConstant.COMMENT_SORT_LINKS);
        return new R<>(map);
    }

    @GetMapping("/listForAbout")
    public R listForAbout(@RequestParam(name = "page", required = false) String page) {
        if (page == null || page == "") {
            page = "1";
        }
        QueryPage queryPage = new QueryPage(Integer.valueOf(page), SiteConstant.COMMENT_PAGE_LIMIT);
        Map<String, Object> map = commentService.findCommentsList(queryPage, null, SiteConstant.COMMENT_SORT_ABOUT);
        return new R<>(map);
    }

    @PostMapping("/list")
    public R list(SysComment comment, QueryPage queryPage) {
        return new R<>(super.getData(commentService.list(comment, queryPage)));
    }

    @GetMapping("/{id}")
    public R findById(@PathVariable Long id) {
        return new R<>(commentService.getById(id));
    }

    @PostMapping
    public R save(@RequestBody SysComment comment, HttpServletRequest request) {
        try {
            String ip = IPUtil.getIpAddr(request);
            comment.setTime(new Date());
            comment.setIp(ip);
            comment.setAddress(AddressUtil.getAddress(ip));
            String header = request.getHeader(CommonConstant.USER_AGENT);
            UserAgent userAgent = UserAgent.parseUserAgentString(header);
            Browser browser = userAgent.getBrowser();
            OperatingSystem operatingSystem = userAgent.getOperatingSystem();
            comment.setDevice(browser.getName() + "," + operatingSystem.getName());
            commentService.add(comment);
            return new R();
        } catch (Exception e) {
            throw new GlobalException(e.getMessage());
        }
    }

    @PutMapping
    @Log("更新评论")
    public R update(@RequestBody SysComment comment) {
        try {
            commentService.update(comment);
            return new R();
        } catch (Exception e) {
            throw new GlobalException(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Log("删除评论")
    public R delete(@PathVariable Long id) {
        try {
            commentService.delete(id);
            return new R();
        } catch (Exception e) {
            throw new GlobalException(e.getMessage());
        }
    }
}
