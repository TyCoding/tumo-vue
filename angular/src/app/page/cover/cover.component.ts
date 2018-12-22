import { Component, OnInit } from '@angular/core';
import { CoverService } from '../../service/cover.service'
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
@Component({
    selector: 'app-cover',
    templateUrl: './cover.component.html',
    styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {
    public dataSet: any
    public total: number = 100
    public pageIndex: number = 1;
    public pageSize: number = 8;
    public isVisible: boolean = false
    public fileList = [
        {
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: ''
        }
    ];
    public previewImage = '';
    public previewVisible = false;
    public row: any
    constructor(
        private http: HttpClient,
        private message: NzMessageService,
        private coverService: CoverService
    ) { }

    ngOnInit() {
        this.getCover(1, 8)
    }
    public getCover(pageCode, pageSize) {
        this.coverService.getCover(pageCode, pageSize).subscribe(res => {
            this.dataSet = res.data.rows
            this.total = res.data.total
        })
    }
    public pageChange() {
        this.getCover(this.pageIndex, this.pageSize)
    }
    public editBtn(row) {
        this.row = row
        // console.log(row)
        this.fileList = [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: ''
        }]
        this.coverService.getImg(row.id).subscribe(res => {
            // console.log(res)
            this.fileList[0].uid = res.data.id;
            this.fileList[0].url = res.data.titlePic

        })
        this.isVisible = true
    }
    public handleCancel() {
        this.isVisible = false
    }
    public handleOk() {
        this.isVisible = false
    }


    handlePreview = (file: UploadFile) => {
        console.log(file)
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    }


    customReq = (item: UploadXHRArgs) => {
        console.log(item)
        // 构建一个 FormData 对象，用于存储文件或其他参数
        const formData = new FormData();
        // tslint:disable-next-line:no-any
        formData.append('file', item.file as any);
        formData.append('id', this.row.id);
        const req = new HttpRequest('POST', item.action, formData, {
            reportProgress: true,
            withCredentials: true
        });
        // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
        return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
            if (event.type === HttpEventType.UploadProgress) {
                if (event.total > 0) {
                    // tslint:disable-next-line:no-any
                    (event as any).percent = event.loaded / event.total * 100;
                }
                // 处理上传进度条，必须指定 `percent` 属性来表示进度
                item.onProgress(event, item.file);
            } else if (event instanceof HttpResponse) {
                // 处理成功
                console.log("成功了？")
                this.getCover(1, 8)
                item.onSuccess(event.body, item.file, event);
            }
        }, (err) => {
            // 处理失败
            item.onError(err, item.file);
        });
    }
}
