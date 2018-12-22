import { Component, OnInit, ElementRef } from '@angular/core';
import { ArticleService } from '../../service/article.service'
import { NzMessageService } from 'ng-zorro-antd';
@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    public qIpt: HTMLInputElement;
    public total: number = 100
    public pageIndex: number = 1;
    public pageSize: number = 10;
    public searchKey: string = '';
    public dataSet: any[] = []

    public allCheckeds = []
    allChecked = false;
    indeterminate = false;
    displayData = [];
    constructor(
        private articleService: ArticleService,
        private message: NzMessageService,
        private el: ElementRef,
    ) { }

    ngOnInit() {
        this.getArticle(1, 10, '')
    }
    ngAfterViewInit() {
        this.qIpt = (this.el.nativeElement as HTMLElement).querySelector(
            '.ant-input',
        ) as HTMLInputElement;
        this.qIpt.onkeydown = (e) => {
            if (e.keyCode === 13) {
                this.getArticle(1, 10, this.searchKey)
            }
        }
    }
    public getArticle(pageCode, pageSize, searchKey) {
        this.articleService.getArticle(pageCode, pageSize, searchKey).subscribe(res => {
            if (res.code === 20000) {
                this.total = res.data.total
                this.dataSet = res.data.rows
            } else {
                this.message.create('error', res.data);
            }
        })
    }
    public searchData(rest: boolean = false): void {
        if (rest) {
            this.pageIndex = 1;
        }
        this.getArticle(this.pageIndex, this.pageSize, '')
    }

    currentPageDataChange($event: Array<any>): void {
        this.displayData = $event;
        this.refreshStatus();
    }

    refreshStatus(): void {
        const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
        const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.allCheckeds = []
        this.displayData.forEach(item => {
            if (item.checked === true) {
                this.allCheckeds.push(item.id)
            }
        })
        console.log(this.allCheckeds)
    }

    checkAll(value: boolean): void {
        this.displayData.forEach(data => {
            if (!data.disabled) {
                data.checked = value;
            }
        });
        this.refreshStatus();
    }


    public deleteRow(row) {
        let arrId = []
        arrId.push(row.id)
        this.delete(arrId)
    }

    public deleteAll() {
        this.delete(this.allCheckeds)
    }
    public delete(ids) {
        this.articleService.deleteArticle(ids).subscribe(res => {
            console.log(res)
            if (res.code === 20000) {
                this.message.create('success', res.data);
                this.getArticle(1, 10, '')
            } else {
                this.message.create('error', res.data);
            }
        })
    }
    public refresh() {
        this.getArticle(1, 10, '')
    }
}
