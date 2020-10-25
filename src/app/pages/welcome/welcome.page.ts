import { LocalStorageService } from './../../shared/local-storage.service';
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
    constructor(private localStorageService: LocalStorageService, private router: Router) { }

    ngOnInit() {
        // // 第一次调用get方法时，APP_KEY不存在，第二个参数会作为默认值返回
        // const appConfig: any = this.localStorageService.get(APP_KEY, {
        //     isLaunched: false,
        //     version: '1.0.0'
        // });

        // if (appConfig.isLaunched === false) {
        //     appConfig.isLaunched = true;
        //     this.localStorageService.set(APP_KEY, appConfig);
        // } else {
        //     // todo
        //     this.router.navigateByUrl('folder/Inbox');
        // }
    }

    onSlideWillChange(event) {
        console.log(event);
        this.slides.isEnd().then((end) => {
            this.showSkip = !end;
        });
    }

    onSkip() {
        this.router.navigateByUrl('passport/signup');
    }
}
