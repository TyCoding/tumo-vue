import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service'
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public validateForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private storage: LoginServiceService,
        private message: NzMessageService,
    ) { }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });
        let remember = JSON.parse(localStorage.getItem('remember'))
        const username = localStorage.getItem('username')
        this.validateForm.setValue({
            remember,
            userName: username,
            password: ''
        })
    }

    submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        localStorage.setItem('remember', this.validateForm.value.remember)
        if (this.validateForm.value.remember) {
            localStorage.setItem('username', this.validateForm.value.userName)
        } else {
            localStorage.removeItem('username')
        }
        if (!this.validateForm.value.userName || !this.validateForm.value.password) {
            return
        } else {
            this.storage.login(this.validateForm.value).subscribe((res: any) => {
                if (res.code !== 20000) {
                    this.message.create('error', res.data);
                } else {
                    this.message.create('success', '登录成功');
                    this.router.navigateByUrl('/index');
                }
            })

        }
    }
}
