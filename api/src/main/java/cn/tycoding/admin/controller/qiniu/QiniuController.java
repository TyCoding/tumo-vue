package cn.tycoding.admin.controller.qiniu;

import cn.tycoding.admin.dto.IdWorker;
import cn.tycoding.admin.dto.Result;
import cn.tycoding.admin.dto.StatusCode;
import cn.tycoding.admin.enums.ResultEnums;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * 对七牛云对象储存的操作接口
 * 关于七牛云开放的Java-API文档请看：https://developer.qiniu.com/kodo/sdk/1662/java-sdk-6
 * 文件上传的DEMO请看 /test/java/cn/tycoding/UploadDemo.java 测试类。
 * 请先到七牛云个人控制中心查看Access key 和 Secret Key
 *
 * @auther TyCoding
 * @date 2018/12/16
 */
@RestController
@RequestMapping("/qiniu")
public class QiniuController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    IdWorker idWorker = new IdWorker(); //分布式ID生成器，用于设定上传文件的名称

    //设置好账号的ACCESS_KEY和SECRET_KEY
//    private static final String ACCESS_KEY = "Access_Key";
    private static final String ACCESS_KEY = "ShNkTksRRD57KgoO7ppPo1jfn1Jaj_YqWlj5jWjQ";
    //    private static final String SECRET_KEY = "Secret_Key";
    private static final String SECRET_KEY = "1YrjBCcEgvsFoVJNcAbrXXQpiOxMMdnPR2PJQ-Z5";
    //要上传的空间
//    private static final String BUCKETNAME = "Bucket_Name";
    private static final String BUCKETNAME = "images";

    //个人七牛云对象储存外链域名地址
    private static final String url = "http://img.api.tycoding.cn/";

    /**
     * 文件上传接口，调用七牛云开放的API
     *
     * @param file 上传的文件
     * @return 返回成功上传的文件：1.名称、2.外链地址
     * <p>
     * 注意：我们指定分布式ID生成器IdWorker工具类生成的随机数作为文件名称；
     * 外链：如果你是第一次使用七牛云，你需要先了解一下如何为自己的七牛云对象储存配置外链地址，因为官方提供的测试外链有时间限制
     * <p>
     * 此部分我后续会写文档讲解
     */
    @RequestMapping("/upload")
    public Result upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        if (!file.isEmpty()) {

            //上传文件路径
            String FilePath = "";
            //上传到七牛后保存的文件名
            String key = idWorker.nextId() + "";

            try {
                //将MutipartFile对象转换为File对象，相当于需要以本地作为缓冲区暂时储存文件
                //获取文件在服务器的储存位置
                File path = new File(ResourceUtils.getURL("classpath:").getPath());
                File filePath = new File(path.getAbsolutePath(), "upload/");
                if (!filePath.exists() && !filePath.isDirectory()) {
                    logger.info("目录不存在，创建目录===========>" + filePath);
                    filePath.mkdir();
                }
                String filename = file.getOriginalFilename(); //获取原始文件名称
                key += filename.substring(filename.lastIndexOf(".")); //获取文件类型

                File localFile = new File(filePath, key);
                file.transferTo(localFile); //写入磁盘
                logger.info("文件原始路径=========>" + filePath);
                logger.info("新文件名称===========>" + key);
                FilePath = filePath + "/" + key;

                //密钥配置
                Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
                //第二种方式: 自动识别要上传的空间(bucket)的存储区域是华东、华北、华南。
                Zone z = Zone.autoZone();
                Configuration c = new Configuration(z);
                //创建上传对象
                UploadManager uploadManager = new UploadManager(c);
                //调用put方法上传
                Response res = uploadManager.put(FilePath, key, auth.uploadToken(BUCKETNAME));
                //打印返回的信息
                //res.bodyString() 返回数据格式： {"hash":"FlHXdiArTIzeNy94EOxzlCQC7pDS","key":"1074213185631420416.png"}
                logger.info("文件上传成功============>" + res.bodyString());
                Map map = new HashMap<>();
                map.put("name", key);
                map.put("url", url + key);

                if (localFile.exists()) {
                    localFile.delete(); //删除本地缓存的文件
                }

                return new Result(StatusCode.SUCCESS, map);
            } catch (Exception e) {
                e.printStackTrace();
                logger.error("文件上传失败============>" + e.getMessage());
            }
        }
        return new Result(StatusCode.ERROR, ResultEnums.ERROR);
    }
}
