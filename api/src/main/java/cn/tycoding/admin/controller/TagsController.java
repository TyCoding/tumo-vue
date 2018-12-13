package tumo.tycoding.admin.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tumo.tycoding.admin.dto.ModifyResult;
import tumo.tycoding.admin.dto.PageBean;
import tumo.tycoding.admin.entity.Tags;
import tumo.tycoding.admin.enums.ModifyEnums;
import tumo.tycoding.admin.service.TagsService;

import java.util.List;

/**
 * @auther TyCoding
 * @date 2018/10/18
 */
@RestController
@SuppressWarnings("all")
@RequestMapping("/tags")
public class TagsController {

    @Autowired
    private TagsService tagsService;

    @RequestMapping("/findAllCount")
    public Long findAllCount(){
        return tagsService.findAllCount();
    }

    /**
     * 查询所有
     *
     * @return
     */
    @RequestMapping("/findAll")
    public List<Tags> findAll() {
        return tagsService.findAll();
    }

    /**
     * 分页查询
     *
     * @param comments  查询条件
     * @param pageCode 当前页
     * @param pageSize 每页显示的记录数
     * @return
     */
    @RequestMapping("/findByPage")
    public PageBean findByPage(Tags tags,
                               @RequestParam(value = "pageCode", required = false) Integer pageCode,
                               @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        return tagsService.findByPage(tags, pageCode, pageSize);
    }

    @RequestMapping("/findById")
    public Tags findById(@RequestParam("id") Long id) {
        return tagsService.findById(id);
    }

    @RequestMapping("/save")
    public ModifyResult save(@RequestBody Tags tags) {
        try {
            tagsService.save(tags);
            return new ModifyResult(true, ModifyEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new ModifyResult(false, e.getMessage());
        }
    }

    @RequestMapping("/update")
    public ModifyResult update(@RequestBody Tags tags) {
        try {
            tagsService.update(tags);
            return new ModifyResult(true, ModifyEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new ModifyResult(false, e.getMessage());
        }
    }

    @RequestMapping("/delete")
    public ModifyResult delete(@RequestBody Long... ids) {
        try {
            tagsService.delete(ids);
            return new ModifyResult(true, ModifyEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new ModifyResult(false, e.getMessage());
        }
    }
}
