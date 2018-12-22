import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginServiceService {

    constructor(
        private http: HttpClient,
    ) { }
    public login(val) {
        let formData = new FormData();
        formData.append("username", val.userName);
        formData.append("password", val.password);
        formData.append("remember", (val.remember ? true : false).toString());
        return this.http.post('http://localhost:8084/admin/login', formData)
    }

}
