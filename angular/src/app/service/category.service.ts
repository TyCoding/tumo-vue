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
export class CategoryService {

    constructor(
        private http: HttpClient,
    ) { }
    public getCategory(pageCode, pageSize): Observable<any> {
        return this.http.post('http://localhost:8084/category/findByPage?pageSize=' + pageSize + '&pageCode=' + pageCode, httpOptions)
    }
    public deleteCategory(ids): Observable<any> {
        return this.http.post('http://localhost:8084/category/delete', JSON.stringify(ids), httpOptions)
    }

    public getTags(pageCode, pageSize): Observable<any> {
        return this.http.post('http://localhost:8084/tags/findByPage?pageSize=' + pageSize + '&pageCode=' + pageCode, httpOptions)
    }
    public deleteTags(ids): Observable<any> {
        return this.http.post('http://localhost:8084/tags/delete', JSON.stringify(ids), httpOptions)
    }
    public addCategory(category): Observable<any> {
        return this.http.post('http://localhost:8084/category/save', JSON.stringify(category), httpOptions)
    }
    public editCategory(category): Observable<any> {
        return this.http.put('http://localhost:8084/category/update', JSON.stringify(category), httpOptions)
    }

    public addTags(category): Observable<any> {
        return this.http.post('http://localhost:8084/tags/save', JSON.stringify(category), httpOptions)
    }
    public editTags(category): Observable<any> {
        return this.http.put('http://localhost:8084/tags/update', JSON.stringify(category), httpOptions)
    }
}
