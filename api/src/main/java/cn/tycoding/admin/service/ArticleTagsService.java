package tumo.tycoding.admin.service;


import tumo.tycoding.admin.entity.ArticleTags;
import tumo.tycoding.admin.entity.Tags;

import java.util.List;

/**
 * @auther TyCoding
 * @date 2018/10/22
 */
public interface ArticleTagsService extends BaseService<ArticleTags> {

    List<Tags> findByArticleId(long articleId);
}
