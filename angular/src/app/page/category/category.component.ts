import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { CategoryService } from '../../service/category.service'
@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    public total: number = 100
    public pageIndex: number = 1;
    public pageSize: number = 5;
    public searchKey: string = '';
    public dataSet: any[] = []
    public isVisible: boolean = false
    public inputValueCa: string = null
    public caModalTigle: string = '新增分类'
    public rowData: any
    public placeholderVal = '请输入分类名称'
    public AddOnBe: string = '分类名称'

    public totalTag: number = 100
    public pageIndexTag: number = 1;
    public pageSizeTag: number = 5;
    public searchKeyTag: string = '';
    public dataSetTag: any[] = []

    constructor(
        private message: NzMessageService,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.getCategory(1, 5)
        this.getTags(1, 5)
    }
    public getCategory(pageCode: number, pageSize: number): void {
        this.categoryService.getCategory(pageCode, pageSize).subscribe(res => {
            if (res.code === 20000) {
                console.log(res)
                this.total = res.data.total
                this.dataSet = res.data.rows
            } else {
                this.message.create('error', res.data);
            }
        })
    }
    public getTags(pageCode: number, pageSize: number): void {
        this.categoryService.getTags(pageCode, pageSize).subscribe(res => {
            if (res.code === 20000) {
                this.totalTag = res.data.total
                this.dataSetTag = res.data.rows
            } else {
                this.message.create('error', res.data);
            }
        })
    }

    public deleteRow(row: any): void {
        let arrId = []
        arrId.push(row.id)
        this.delete(arrId)
    }


    public delete(ids: any): void {
        this.categoryService.deleteCategory(ids).subscribe(res => {
            if (res.code === 20000) {
                this.message.create('success', res.data);
                this.getCategory(1, 5)
            } else {
                this.message.create('error', res.data);
            }
        })
    }

    public handleEditCa(row: any): void {
        this.handleEdit(row, '分类')
    }
    public handleEditTag(row: any): void {
        this.handleEdit(row, '标签')
    }
    public handleEdit(row: any, str: string): void {
        this.rowData = row
        this.AddOnBe = str + '名称'
        this.placeholderVal = "请输入" + str + "名称"
        this.caModalTigle = '修改' + str
        this.inputValueCa = str == '分类' ? row.cName : row.tName
        this.isVisible = true
    }

    public deleteRowTag(row: any): void {
        let arrId = []
        arrId.push(row.id)
        this.deleteTag(arrId)
    }


    public deleteTag(ids: any): void {
        this.categoryService.deleteTags(ids).subscribe(res => {
            console.log(res)
            if (res.code === 20000) {
                this.message.create('success', res.data);
                this.getTags(1, 5)
            } else {
                this.message.create('error', res.data);
            }
        })
    }
    public addCategory(): void {
        this.addComm('分类')
    }
    public addTags() {
        this.addComm('标签')
    }
    public handleCancelAddCa(): void {
        this.inputValueCa = null
        this.isVisible = false
    }
    public addComm(str: string): void {
        this.AddOnBe = str + '名称'
        this.placeholderVal = '请输入' + str + '名称'
        this.caModalTigle = '新增' + str
        this.inputValueCa = null
        this.isVisible = true
    }
    public handleOkAddCa(): void {
        if (!this.inputValueCa) {
            this.message.create('error', '分类名称不能为空，请输入分类名称');
        } else {
            if (this.caModalTigle === '新增分类') {
                this.categoryService.addCategory(this.inputValueCa).subscribe(res => {
                    if (res.code === 20000) {
                        this.message.create('success', res.data);
                        this.getCategory(1, 5)
                    } else {
                        this.message.create('error', res.data);
                    }
                    this.isVisible = false
                })
            } else if (this.caModalTigle === '修改分类') {
                const obj = {
                    id: this.rowData.id,
                    cName: this.inputValueCa
                }
                this.categoryService.editCategory(obj).subscribe(res => {
                    if (res.code === 20000) {
                        this.message.create('success', res.data);
                        this.getCategory(1, 5)
                    } else {
                        this.message.create('error', res.data);
                    }
                    this.isVisible = false
                })
            } else if (this.caModalTigle === '新增标签') {
                this.categoryService.addTags(this.inputValueCa).subscribe(res => {
                    if (res.code === 20000) {
                        this.message.create('success', res.data);
                        this.getTags(1, 5)
                    } else {
                        this.message.create('error', res.data);
                    }
                    this.isVisible = false
                })
            } else if (this.caModalTigle === '修改标签') {
                const obj = {
                    id: this.rowData.id,
                    tName: this.inputValueCa
                }
                this.categoryService.editTags(obj).subscribe(res => {
                    if (res.code === 20000) {
                        this.message.create('success', res.data);
                        this.getTags(1, 5)
                    } else {
                        this.message.create('error', res.data);
                    }
                    this.isVisible = false
                })
            }
        }
    }


    public searchData(rest: boolean = false): void {
        if (rest) {
            this.pageIndex = 1;
        }
        this.getCategory(this.pageIndex, this.pageSize)
    }
    public searchDataTag(rest: boolean = false): void {
        if (rest) {
            this.pageIndexTag = 1;
        }
        this.getTags(this.pageIndexTag, this.pageSizeTag)
    }
}
