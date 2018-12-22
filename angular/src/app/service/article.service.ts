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
export class ArticleService {

    constructor(
        private http: HttpClient,
    ) { }
    public getArticle(pageCode, pageSize, searchEntity): Observable<any> {
        return this.http.post('http://localhost:8084/article/findByPage?pageSize=' + pageSize + '&pageCode=' + pageCode, searchEntity)
    }
    public deleteArticle(ids): Observable<any> {
        return this.http.post('http://localhost:8084/article/delete', JSON.stringify(ids), httpOptions)
    }
}
