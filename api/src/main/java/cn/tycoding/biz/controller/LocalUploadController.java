package cn.tycoding.biz.controller;

import cn.hutool.core.util.URLUtil;
import cn.tycoding.common.constants.CommonConstant;
import cn.tycoding.common.constants.enums.CommonEnum;
import cn.tycoding.common.utils.R;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.util.ClassUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author tycoding
 * @since 2020/11/28
 */
@RestController
@RequestMapping(CommonConstant.BASE_API)
public class UploadDownController {

    @Value("${server.port}")
    private int port;

    /**
     * 文件上传
     *
     * @param file
     * @param request
     * @return
     */
    @RequestMapping("/upload")
    public R upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws FileNotFoundException {
        //获取文件在服务器的储存位置
        String path = ResourceUtils.getURL("classpath:").getPath() + "/static/upload";
        File filePath = new File(path);
        System.out.println("文件的保存路径：" + path);
        if (!filePath.exists() && !filePath.isDirectory()) {
            System.out.println("目录不存在，创建目录:" + filePath);
            filePath.mkdir();
        }

        //获取原始文件名称(包含格式)
        String originalFileName = file.getOriginalFilename();
        System.out.println("原始文件名称：" + originalFileName);

        //获取文件类型，以最后一个`.`为标识
        String type = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
        System.out.println("文件类型：" + type);
        //获取文件名称（不包含格式）
        String name = originalFileName.substring(0, originalFileName.lastIndexOf("."));

        //设置文件新名称: 当前时间+文件名称（不包含格式）
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String date = sdf.format(d);
        String fileName = date + name + "." + type;
        System.out.println("新文件名称：" + fileName);

        //在指定路径下创建一个文件
        File targetFile = new File(path, fileName);

        //将文件保存到服务器指定位置
        try {
            file.transferTo(targetFile);
            System.out.println("上传成功");
            //将文件在服务器的存储路径返回
            Map<String, Object> map = new HashMap<>();
            map.put("url", "http://localhost:" + port + "/upload/" + fileName);
            return new R(map);
        } catch (IOException e) {
            System.out.println("上传失败");
            e.printStackTrace();
            return new R(CommonEnum.UPLOAD_FAIL);
        }
    }
}
