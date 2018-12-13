package tumo.tycoding.admin.mapper;

import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import tumo.tycoding.admin.entity.Links;

import java.util.List;

/**
 * @auther TyCoding
 * @date 2018/10/18
 */
@Mapper
public interface LinksMapper {

    List<Links> findAll();

    Page findByPage(Links links);

    Links findById(long id);

    int save(Links links);

    int update(Links links);

    int delete(long id);

    Long findAllCount();
}
