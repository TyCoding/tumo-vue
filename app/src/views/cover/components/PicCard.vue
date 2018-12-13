<template>
    <div>
        <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <el-card class="box-card-component" style="margin-left:8px;">
                    <div slot="header" class="box-card-header">
                        <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
                    </div>
                    <div class="footer">
                        <span>标题</span>
                        <div class="bottom clearfix">
                            <time class="time">2018-12-12 12:12:12</time>
                            <el-button type="text" class="button">编辑</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <el-card class="box-card-component" style="margin-left:8px;">
                    <div slot="header" class="box-card-header">
                        <img src="http://img.api.tycoding.cn/img6.png">
                    </div>
                    <div class="footer">
                        <span>标题</span>
                        <div class="bottom clearfix">
                            <time class="time">2018-12-12 12:12:12</time>
                            <el-button type="text" class="button">编辑</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "PicCard"
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .box-card-component {
        .el-card__header {
            padding: 0px !important;
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .card-panel-col{
        margin: 20px 0;
    }
    .box-card-component {
        .box-card-header {
            position: relative;
            height: 220px;
            img {
                width: 100%;
                height: 100%;
                transition: all 0.3s linear;
                &:hover {
                    transform: scale(1.1, 1.1);
                    filter: contrast(130%);
                }
            }
        }
        .footer{
            .bottom {
                /*margin-top: 13px;*/
                /*line-height: 12px;*/
                .time {
                    font-size: 13px;
                    color: #999;
                }
                .button {
                    padding: 0;
                    float: right;
                }
            }
            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }

            .clearfix:after {
                clear: both
            }
        }
    }

</style>
