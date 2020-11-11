import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

export const APP_KEY = 'App';
// @Component修饰class
// selector:定义选择器
@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
    encapsulation: ViewEncapsulation.None // 允许外部css修改
})
export class WelcomePage implements OnInit {
    showSkip = true;
    @ViewChild('slides', { static: false }) slides: IonSlides;
    constructor(private router: Router) { }

    ngOnInit() {
    }

    onSlideWillChange(event) {
        console.log(event);
        this.slides.isEnd().then((end) => {
            this.showSkip = !end;
        });
    }

    onSkip() {
        this.router.navigateByUrl('passport/login');
    }
}
