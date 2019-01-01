<template>
    <div class="dashboard-editor-container">

        <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>

        <panel-group @handleSetLineChartData="handleSetLineChartData"/>

        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="lineChartData"/>
        </el-row>

        <el-row :gutter="8">
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 20}" :lg="{span: 10}" :xl="{span: 10}" style="padding-right:8px;margin-bottom:30px;">
                <new-article/>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 16}" :md="{span: 16}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
                <new-comments/>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
                <box-card/>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import GithubCorner from '@/components/GithubCorner'
    import PanelGroup from './components/PanelGroup'
    import LineChart from './components/LineChart'
    import NewArticle from './components/NewArticle'
    import NewComments from './components/NewComments'
    import BoxCard from './components/BoxCard'

    const lineChartData = {
        newVisitis: {
            expectedData: [100, 120, 161, 134, 105, 160, 165],
            actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        messages: {
            expectedData: [200, 192, 120, 144, 160, 130, 140],
            actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
            expectedData: [80, 100, 121, 104, 105, 90, 100],
            actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
            expectedData: [130, 140, 141, 142, 145, 150, 160],
            actualData: [120, 82, 91, 154, 162, 140, 130]
        }
    }

    export default {
        name: 'DashboardAdmin',
        components: {
            GithubCorner,
            PanelGroup,
            LineChart,
            NewArticle,
            NewComments,
            BoxCard
        },
        data() {
            return {
                lineChartData: lineChartData.newVisitis
            }
        },
        methods: {
            handleSetLineChartData(type) {
                this.lineChartData = lineChartData[type]
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard-editor-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);
        .chart-wrapper {
            background: #fff;
            padding: 16px 16px 0;
            margin-bottom: 32px;
        }
    }
</style>
