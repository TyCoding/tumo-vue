import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private http: HttpClient,
    ) { }
    public articleAll(): Observable<any>  {
        return this.http.get('http://localhost:8084/article/findAll')
    }
    public commentsAll(): Observable<any> {
        return this.http.get('http://localhost:8084/comments/findAll')
    }
    public articleAllCount(): Observable<any> {
        return this.http.get('http://localhost:8084/article/findAllCount')
    }
    public commentsAllCount(): Observable<any> {
        return this.http.get('http://localhost:8084/comments/findAllCount')
    }
    public tagsAllCount(): Observable<any> {
        return this.http.get('http://localhost:8084/tags/findAllCount')
    }
    public linksAllCount(): Observable<any> {
        return this.http.get('http://localhost:8084/links/findAllCount')
    }
}
