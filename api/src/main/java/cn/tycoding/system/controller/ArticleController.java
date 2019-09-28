package cn.tycoding.system.controller;

import cn.tycoding.common.annotation.Log;
import cn.tycoding.common.constants.CommonConstant;
import cn.tycoding.common.constants.SiteConstant;
import cn.tycoding.common.controller.BaseController;
import cn.tycoding.common.exception.GlobalException;
import cn.tycoding.common.utils.QueryPage;
import cn.tycoding.common.utils.R;
import cn.tycoding.system.entity.SysArticle;
import cn.tycoding.system.entity.SysCategory;
import cn.tycoding.system.entity.SysTag;
import cn.tycoding.system.entity.dto.ArchivesWithArticle;
import cn.tycoding.system.service.ArticleService;
import cn.tycoding.system.service.ArticleTagService;
import cn.tycoding.system.service.CategoryService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author TyCoding
 * @date 2018/10/16
 */
@RestController
@RequestMapping("/api/article")
@Api(value = "ArticleController", tags = {"文章管理接口"})
public class ArticleController extends BaseController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ArticleTagService articleTagService;

    @Autowired
    private CategoryService categoryService;

    /**
     * 查询文章前8条数量
     *
     * @return
     */
    @GetMapping("/findAll")
    public R findAll() {
        return new R<>(articleService.findAll());
    }

    /**
     * 分页查询 - 为博客前台服务
     *
     * @param p 页码
     * @return
     */
    @GetMapping({"/listForSite", "/listForSite/page/{p}"})
    public R listForSite(@PathVariable(required = false) String p) {
        if (StringUtils.isBlank(p)) {
            p = "1";
        }
        IPage<SysArticle> page = new Page<>(Integer.valueOf(p), SiteConstant.DEFAULT_PAGE_LIMIT);
        LambdaQueryWrapper<SysArticle> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(SysArticle::getId);
        queryWrapper.eq(SysArticle::getState, CommonConstant.DEFAULT_RELEASE_STATUS);
        IPage<SysArticle> list = articleService.page(page, queryWrapper);
        list.getRecords().forEach(a -> {
            String content = Jsoup.parse(a.getContent()).text();
            if (content.length() > 50) {
                content = content.substring(0, 40) + "...";
            }
            a.setContent(content);
            a.setContentMd(null);

            if (StringUtils.isNotBlank(a.getCategory())) {
                SysCategory category = categoryService.getById(a.getCategory());
                if (category != null) {
                    a.setCategory(category.getName());
                } else {
                    a.setCategory(null);
                }
            }
        });
        Map<String, Object> data = super.getData(list);
        data.put("current", list.getCurrent());
        data.put("pages", list.getPages());
        return new R<>(data);
    }

    @PostMapping("/list")
    public R<Map<String, Object>> findByPage(@RequestBody SysArticle sysArticle, QueryPage queryPage) {
        return new R<>(super.getData(articleService.list(sysArticle, queryPage)));
    }

    @GetMapping("{id}")
    public R<SysArticle> findById(@PathVariable Long id) {
        return new R<>(articleService.findById(id));
    }

    /**
     * 查询指定ArticleId的Tags数据
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}/tags")
    public R<List<String>> findTags(@PathVariable Long id) {
        List<String> list = new ArrayList<String>();
        List<SysTag> tagList = articleTagService.findByArticleId(id);
        for (SysTag t : tagList) {
            list.add(t.getName());
        }
        return new R<>(list);
    }

    /**
     * 查询所有的Archives
     *
     * @return
     */
    @GetMapping("/archives")
    public R<List<ArchivesWithArticle>> findArchives() {
        return new R<>(articleService.findArchives());
    }

    @PostMapping
    @Log("新增文章")
    public R save(@RequestBody SysArticle sysArticle) {
        try {
            articleService.add(sysArticle);
            return new R();
        } catch (Exception e) {
            throw new GlobalException(e.getMessage());
        }
    }

    @PutMapping
    @Log("更新文章")
    public R update(@RequestBody SysArticle sysArticle) {
        try {
            articleService.update(sysArticle);
            return new R();
        } catch (Exception e) {
            e.printStackTrace();
            throw new GlobalException(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Log("删除文章")
    public R delete(@PathVariable Long id) {
        try {
            articleService.delete(id);
            return new R();
        } catch (Exception e) {
            e.printStackTrace();
            throw new GlobalException(e.getMessage());
        }
    }
}
