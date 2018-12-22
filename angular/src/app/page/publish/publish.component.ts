import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PublishService } from '../../service/publish.service'
import { EditorConfig } from '../../editor/model/editor-config';
import { NzMessageService } from 'ng-zorro-antd';
import { $ } from 'protractor';

@Component({
    selector: 'app-publish',
    templateUrl: './publish.component.html',
    styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
    public title
    public conf = new EditorConfig();
    public markdown = '';
    public category
    public categorys;
    public author
    public content
    public contentMd
    public tags = [];
    public origin
    public inputVisible = false;
    public inputValue = '';
    @ViewChild('inputElement') inputElement: ElementRef;
    constructor(
        private publishService: PublishService,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
        this.publishService.getAllCategory().subscribe(res => {
            this.categorys = res.data
        })
    }
    handleClose(removedTag: {}): void {
        this.tags = this.tags.filter(tag => tag !== removedTag);
    }

    sliceTagName(tag: string): string {
        const isLongTag = tag.length > 20;
        return isLongTag ? `${tag.slice(0, 20)}...` : tag;
    }

    showInput(): void {
        this.inputVisible = true;
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        }, 10);
    }

    handleInputConfirm(): void {
        if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
            this.tags.push(this.inputValue);
        }
        this.inputValue = '';
        this.inputVisible = false;
    }


    // 同步属性内容
    syncModel(str: string): void {
        this.markdown = str;
    }
    onHtmlEmits(obj: any) {
        this.content = obj.html
        this.contentMd = obj.md
    }

    publishBtn(state) {
        const params = {
            title: this.title,
            titlePic: '',
            category: this.category,
            tags: JSON.stringify(this.tags),
            author: this.author,
            content: this.content,
            contentMd: this.contentMd,
            origin: 'http://baidug.cn',
            state: state
        }
        this.publishService.saveArticle(params).subscribe(res => {
            console.log(res)
            if (res.code === 20000) {
                this.message.create('success', res.data);
                this.title = ''
                this.category = null
                this.author = null
                this.content = null
                this.contentMd = null
                this.tags = null
                this.origin = null
            } else {
                this.message.create('error', res.data);
            }
        })
    }

}
