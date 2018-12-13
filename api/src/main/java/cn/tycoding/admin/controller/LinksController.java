package tumo.tycoding.admin.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tumo.tycoding.admin.dto.ModifyResult;
import tumo.tycoding.admin.dto.PageBean;
import tumo.tycoding.admin.entity.Links;
import tumo.tycoding.admin.enums.ModifyEnums;
import tumo.tycoding.admin.service.LinksService;

import java.util.List;

/**
 * @auther TyCoding
 * @date 2018/10/18
 */
@RestController
@SuppressWarnings("all")
@RequestMapping("/links")
public class LinksController {

    @Autowired
    private LinksService linksService;

    @RequestMapping("/findAllCount")
    public Long findAllCount() {
        return linksService.findAllCount();
    }

    /**
     * 查询所有
     *
     * @return
     */
    @RequestMapping("/findAll")
    public List<Links> findAll() {
        return linksService.findAll();
    }

    /**
     * 分页查询
     *
     * @param comments 查询条件
     * @param pageCode 当前页
     * @param pageSize 每页显示的记录数
     * @return
     */
    @RequestMapping("/findByPage")
    public PageBean findByPage(Links links,
                               @RequestParam(value = "pageCode", required = false) Integer pageCode,
                               @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        return linksService.findByPage(links, pageCode, pageSize);
    }

    @RequestMapping("/findById")
    public Links findById(@RequestParam("id") Long id) {
        return linksService.findById(id);
    }

    @RequestMapping("/save")
    public ModifyResult save(@RequestBody Links links) {
        try {
            linksService.save(links);
            return new ModifyResult(true, ModifyEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new ModifyResult(false, e.getMessage());
        }
    }

    @RequestMapping("/update")
    public ModifyResult update(@RequestBody Links links) {
        try {
            linksService.update(links);
            return new ModifyResult(true, ModifyEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new ModifyResult(false, e.getMessage());
        }
    }

    @RequestMapping("/delete")
    public ModifyResult delete(@RequestBody Long... ids) {
        try {
            linksService.delete(ids);
            return new ModifyResult(true, ModifyEnums.SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            return new ModifyResult(false, e.getMessage());
        }
    }
}
