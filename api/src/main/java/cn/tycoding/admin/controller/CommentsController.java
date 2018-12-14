package cn.tycoding.admin.controller;


import cn.tycoding.admin.dto.Result;
import cn.tycoding.admin.dto.StatusCode;
import cn.tycoding.admin.entity.Comments;
import cn.tycoding.admin.enums.ResultEnums;
import cn.tycoding.admin.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @auther TyCoding
 * @date 2018/10/17
 */
@RestController
@SuppressWarnings("all")
@RequestMapping("/comments")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    @RequestMapping(value = "/findAllCount", method = RequestMethod.GET)
    public Result findAllCount() {
        return new Result(StatusCode.SUCCESS, commentsService.findAllCount());
    }

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public Result findAll() {
        return new Result(StatusCode.SUCCESS, commentsService.findAll());
    }

    @RequestMapping(value = "/findByPage", method = RequestMethod.POST)
    public Result findByPage(Comments comments,
                               @RequestParam(value = "pageCode", required = false) Integer pageCode,
                               @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        if (pageCode != null && pageSize != null) {
            return new Result(StatusCode.SUCCESS, commentsService.findByPage(comments, pageCode, pageSize));
        }
        return new Result(StatusCode.ERROR, ResultEnums.ERROR);
    }

    @RequestMapping(value = "/findCountByArticleId", method = RequestMethod.GET)
    public Result findCountByArticleId(@RequestParam("articleId") Long articleId) {
        if (articleId != null && articleId != 0) {
            return new Result(StatusCode.SUCCESS, commentsService.findCountByArticle(articleId));
        }
        return new Result(StatusCode.ERROR, ResultEnums.ERROR);
    }

    @RequestMapping(value = "/findCommentsList", method = RequestMethod.GET)
    public Result findCommentsList(@RequestParam(value = "pageCode", required = false) Integer pageCode,
                                     @RequestParam(value = "pageSize", required = false) Integer pageSize,
                                     @RequestParam(value = "articleId", required = false) Integer articleId) {
        if (pageCode != null && pageSize != null && articleId != null && articleId != 0) {
            return new Result(StatusCode.SUCCESS, commentsService.findCommentsList(pageCode, pageSize, articleId, 0));
        } else {
            return new Result(StatusCode.ERROR, ResultEnums.ERROR);
        }
    }

    @RequestMapping(value = "/findById", method = RequestMethod.GET)
    public Result findById(@RequestParam("id") Long id) {
        if (id != null && id != 0) {
            return new Result(StatusCode.SUCCESS, commentsService.findById(id));
        } else {
            return new Result(StatusCode.ERROR, ResultEnums.ERROR);
        }
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Result save(@RequestBody Comments comments) {
        try {
            commentsService.save(comments);
            return new Result(StatusCode.SUCCESS, ResultEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(StatusCode.ERROR, ResultEnums.ERROR);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Result update(@RequestBody Comments comments) {
        try {
            commentsService.update(comments);
            return new Result(StatusCode.SUCCESS, ResultEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(StatusCode.ERROR, ResultEnums.ERROR);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public Result delete(@RequestBody Long... ids) {
        try {
            commentsService.delete(ids);
            return new Result(StatusCode.SUCCESS, ResultEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(StatusCode.ERROR, ResultEnums.ERROR);
        }
    }
}
