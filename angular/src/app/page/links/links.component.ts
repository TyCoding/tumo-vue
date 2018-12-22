import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { LinksService } from '../../service/links.service'
@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
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
        private linksService: LinksService
    ) { }

    ngOnInit( ) {
        this.getLinks(1,5,'')
    }
    public getLinks(pageCode, pageSize, searchKey){
        this.linksService.getLinks(pageCode, pageSize, searchKey).subscribe(res=>{
            if (res.code === 20000) {
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
}
