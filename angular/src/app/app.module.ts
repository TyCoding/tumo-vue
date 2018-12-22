import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppComponent } from './app.component';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './page/admin/admin.component';
import { PublishComponent } from './page/publish/publish.component';

import {EditorMdDirective} from '../app/editor/editor-md.directive';
import { ArticleComponent } from './page/article/article.component';
import { CommentsComponent } from './page/comments/comments.component';
import { CategoryComponent } from './page/category/category.component';
import { CoverComponent } from './page/cover/cover.component';
import { LinksComponent } from './page/links/links.component';
import { UserComponent } from './page/user/user.component';
import { SettingComponent } from './page/setting/setting.component'

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        AdminComponent,
        PublishComponent,
        EditorMdDirective,
        ArticleComponent,
        CommentsComponent,
        CategoryComponent,
        CoverComponent,
        LinksComponent,
        UserComponent,
        SettingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        /** 导入 ng-zorro-antd 模块 **/
        NgZorroAntdModule,
        AppRoutingModule
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    bootstrap: [AppComponent]
})
export class AppModule { }
