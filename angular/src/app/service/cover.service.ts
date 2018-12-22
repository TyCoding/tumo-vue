import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
    })
};
@Injectable({
    providedIn: 'root'
})
export class CoverService {
    constructor(
        private http: HttpClient,
    ) { }
    public getCover(pageCode, pageSize): Observable<any> {
        return this.http.post('http://localhost:8084/article/findByPage?pageSize=' + pageSize + '&pageCode=' + pageCode, httpOptions)
    }
    public getImg(id: number): Observable<any> {
        return this.http.get('http://localhost:8084/article/findById?id=' + id)
    }
}
