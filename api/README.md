# API接口

本项目是基于SpringBoot2开发的前后端分离式博客系统，后端仅用来返回JSON数据。

项目接口文档请看 [tumo-vue.tycoding.cn](http://tumo-vue.tycoding.cn/admin/doc/api)

![](http://cdn.tycoding.cn/tumo-vue-006.png)

如果不清楚后端返回JSON数据格式，那么你可以通过postman等工具访问接口，查看接口返回的数据。

# 特性

* 项目基于SpringBoot-2.1.1.RELEASE开发
* 整合七牛云对象储存，实现文件上传、下载、更名
* 全局统一异常处理机制
* 配合前后端分离的开发模式

# 部署

由于本项目基于SpringBoot开发，如果你已经熟悉了SSM的开发方式，入门此项目是很方便的。
项目的部署方式也有很多，这里我暂时先提供最直接的部署方式：war包部署。

只需要在控制台下切换到此项目的根目录，执行：

```html
mvn clean package -Dmaven.test.skip=true
```

# 后记

更详细的文档请看： [如何部署Tumo Blog](https://github.com/TyCoding/tumo/wiki/%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2Tumo-Blog)


