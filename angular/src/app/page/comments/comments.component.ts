import { Component, OnInit, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import {CommentsService} from '../../service/comments.service'
@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
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
        private message: NzMessageService,
        private el: ElementRef,
        private commentsService:CommentsService
    ) { }

    ngOnInit() {
        this.getComments(1,10,'')
    }
    public getComments(pageCode, pageSize, searchKey){
        this.commentsService.getComments(pageCode, pageSize, searchKey).subscribe(res => {
            if (res.code === 20000) {
                console.log(res.data)
                this.total = res.data.total
                this.dataSet = res.data.rows
            } else {
                this.message.create('error', res.data);
            }
        })
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
        this.commentsService.deleteComments(ids).subscribe(res => {
            console.log(res)
            if (res.code === 20000) {
                this.message.create('success', res.data);
                this.getComments(1, 10, '')
            } else {
                this.message.create('error', res.data);
            }
        })
    }
    public refresh() {
        this.getComments(1, 10, '')
    }
    public searchData(rest: boolean = false): void {
        if (rest) {
            this.pageIndex = 1;
        }
        this.getComments(this.pageIndex, this.pageSize, '')
    }

}
