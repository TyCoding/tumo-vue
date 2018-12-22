import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service'
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    public riskList: any[] = [
        { count: 0, type: 'CITY' },
        { count: 0, type: 'DEVICE' },
        { count: 0, type: 'IP' },
        { count: 0, type: 'PASSWORD' }]
    public RISK_TYPE = {
        CITY: '发表文章总数',
        DEVICE: '收到评论总数',
        IP: '添加的标签总数',
        PASSWORD: '友情链接总数'
    }
    public COLOR_SET = [
        { color: 'red', icon: 'edit' },
        { color: 'green', icon: 'message' },
        { color: 'blue', icon: 'tags' },
        { color: 'purple', icon: 'link' }
    ]

    public article;
    public comments;
    constructor(
        private adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.adminService.articleAll().subscribe(res => {
            this.article = res.data
        })
        this.adminService.commentsAll().subscribe(res => {
            this.comments = res.data
        })
        this.adminService.articleAllCount().subscribe(res => {
            this.riskListCover(res.data, 'CITY')
        })
        this.adminService.commentsAllCount().subscribe(res => {
            this.riskListCover(res.data, 'DEVICE')
        })
        this.adminService.tagsAllCount().subscribe(res => {
            this.riskListCover(res.data, 'IP')
        })
        this.adminService.linksAllCount().subscribe(res => {
            this.riskListCover(res.data, 'PASSWORD')
        })
    }

    public riskListCover(res: any, str: string): void {
        this.riskList.forEach(item => {
            if (item.type === str) {
                item.count = res
            }
        })
    }
}
