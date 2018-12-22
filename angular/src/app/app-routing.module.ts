import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { LayoutComponent } from './layout/layout.component'
import { AdminComponent } from './page/admin/admin.component'
import { PublishComponent } from './page/publish/publish.component'
import { ArticleComponent } from './page/article/article.component'
import { CommentsComponent } from './page/comments/comments.component'
import {CoverComponent} from './page/cover/cover.component'
import {CategoryComponent} from './page/category/category.component'
import {LinksComponent} from './page/links/links.component'
import {SettingComponent} from './page/setting/setting.component'
import {UserComponent} from './page/user/user.component'
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    // { path: '**', component: LoginComponent },
    {
        path: 'index',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: AdminComponent
                // redirectTo: '/admin',
                // pathMatch: 'full'
            }, {
                path: 'admin',
                component: AdminComponent
            }, {
                path: 'publish',
                component: PublishComponent
            }, {
                path: 'article',
                component: ArticleComponent
            }, {
                path: 'comments',
                component: CommentsComponent
            },{
                path:'cover',
                component:CoverComponent
            },{
                path:'category',
                component:CategoryComponent
            },{
                path:'links',
                component:LinksComponent
            },{
                path:'setting',
                component:SettingComponent
            },{
                path:'user',
                component:UserComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
