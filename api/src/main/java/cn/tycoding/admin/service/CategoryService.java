package tumo.tycoding.admin.service;


import tumo.tycoding.admin.entity.Category;

/**
 * @auther TyCoding
 * @date 2018/10/18
 */
public interface CategoryService extends BaseService<Category> {

    Category findByName(String name);
}
