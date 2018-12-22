import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class PublishService {

    constructor(
        private http: HttpClient,
    ) { }
    public getAllCategory(): Observable<any> {
        return this.http.get('http://localhost:8084/category/findAll')
    }
    public saveArticle(form): Observable<any>{
        return this.http.post('http://localhost:8084/article/save',form)
    }

}
