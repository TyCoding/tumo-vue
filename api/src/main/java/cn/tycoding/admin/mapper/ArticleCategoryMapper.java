package tumo.tycoding.admin.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import tumo.tycoding.admin.entity.ArticleCategory;

/**
 * @auther TyCoding
 * @date 2018/10/22
 */
@Mapper
public interface ArticleCategoryMapper {

    int save(ArticleCategory articleCategory);

    boolean exists(@Param("articleId") long articleId, @Param("categoryId") long categoryId);

    int delete(long id);
}
