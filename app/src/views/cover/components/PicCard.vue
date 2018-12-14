<template>
    <div>
        <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="item in list" :key="item.id">
                <el-card class="box-card-component" style="margin-left:8px;">
                    <div slot="header" class="box-card-header">
                        <img :src="item.titlePic">
                    </div>
                    <div class="footer">
                        <span>{{item.title}}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{item.publishTime}}</time>
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
        name: "PicCard",
        props: ['list'],
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {

        }
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
    * {
        [class*=el-col-] {
            float: none;
            display: inline-block;
        }
    }
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
                margin-top: 13px;
                line-height: 12px;
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
