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
export class CommentsService {

    constructor(
        private http: HttpClient,
    ) { }

    public getComments(pageCode, pageSize, searchEntity): Observable<any> {
        return this.http.post('http://localhost:8084/comments/findByPage?pageSize=' + pageSize + '&pageCode=' + pageCode, searchEntity)
    }
    public deleteComments(ids): Observable<any> {
        return this.http.post('http://localhost:8084/comments/delete', JSON.stringify(ids), httpOptions)
    }

}
