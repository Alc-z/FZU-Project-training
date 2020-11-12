import { UserService } from './pages/passport/user.service';
import { PassportService } from './pages/passport/passport.service';
import { Component, OnInit } from '@angular/core';

import { MenuController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    shopName: string;
    identifier: string;

    public appPages = [
        { title: '开店论坛', url: '/home', icon: 'chatbox' },
        { title: '手机橱窗', url: '/home', icon: 'create' },
        { title: '邀请有礼', url: '/home', icon: 'git-merge' },
        { title: '资金账户', url: '/home', icon: 'person-outline' },
        { title: '反馈建议', url: '/home', icon: 'construct-outline' },
        { title: '帮助中心', url: '/home', icon: 'information-outline' },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private passportService: PassportService,
        private userService: UserService,
        private menuController: MenuController,
    ) {
        this.initializeApp();
        const loginLog = this.passportService.getLoginLog();
        const id = loginLog.userId;
        const user = this.userService.getUser(id);
        this.shopName = user.shopName;
        this.identifier = loginLog.identifier;
    }

    ionViewWillEnter() {
        this.menuController.enable(false);
    }

    ionViewDidLeave() {
        // this.events.unsubscribe('shop:modified');
        this.menuController.enable(true);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
    }
}
