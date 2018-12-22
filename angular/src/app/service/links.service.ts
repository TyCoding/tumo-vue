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
export class LinksService {

    constructor(
        private http: HttpClient,
    ) { }
    public getLinks(pageCode, pageSize, searchKey): Observable<any> {
        return this.http.post('http://localhost:8084/links/findByPage?pageSize=' + pageSize + '&pageCode=' + pageCode, searchKey, httpOptions)
    }
}
