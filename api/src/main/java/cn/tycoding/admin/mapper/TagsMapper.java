package cn.tycoding.admin.mapper;

import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import cn.tycoding.admin.entity.Tags;

import java.util.List;

/**
 * @auther TyCoding
 * @date 2018/10/18
 */
@Mapper
public interface TagsMapper {

    List<Tags> findAll();

    Page findByPage(Tags tags);

    Tags findById(long id);

    int save(Tags tags);

    int update(Tags tags);

    int delete(long id);

    boolean exists(String name);

    Tags findByName(String name);

    List<Tags> findByArticleTagsId(long articleId, long tagsId);

    Long findAllCount();
}
