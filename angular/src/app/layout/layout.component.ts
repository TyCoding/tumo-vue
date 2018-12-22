import { Component, OnInit, TemplateRef, ViewChild, HostListener } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    isCollapsed = false;
    triggerTemplate = null;
    @ViewChild('trigger') customTrigger: TemplateRef<void>;

    changeTrigger(): void {
        this.triggerTemplate = this.customTrigger;
    }
    constructor() { }

    ngOnInit() {
        const widthS = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (widthS < 768) {
            this.isCollapsed = true
        } else {
            this.isCollapsed = false
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(e: any) {
        const widthS = e.srcElement.innerWidth
        if (widthS < 768) {
            this.isCollapsed = true
        } else {
            this.isCollapsed = false
        }
    }

}
