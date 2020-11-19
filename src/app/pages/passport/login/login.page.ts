import { Router } from '@angular/router';
import { PassportService } from './../passport.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ToastController, MenuController, NavController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    login: any = {
        identifier: '',
        password: ''
    };

    constructor(
        private toastController: ToastController,
        private passportService: PassportService,
        private alertController: AlertController,
        private navCtrl: NavController,
        private router: Router,
        private menuController: MenuController
    ) {
        const loginLog = this.passportService.getLoginLog();
        if (loginLog !== null) {
            this.login.identifier = loginLog.identifier;
        }
    }

    ionViewWillEnter() {
        this.menuController.enable(false);
    }

    ionViewDidLeave() {
        this.menuController.enable(true);
    }

    // 点击登录按钮时调用
    async onLogin(form: NgForm) {
        let toast: any;

        // 判断表单验证是否正确
        if (form.invalid) { // 如果不正确，create一个toast，显示3秒
            toast = await this.toastController.create({
                duration: 3000
            });
        }
        if (form.controls.identifier.errors?.required) {
            toast.message = '请输入您的手机号码或者邮箱';
            toast.present();
            return;
        }

        this.passportService.login(this.login).then((ajaxResult) => {
            if (ajaxResult.success) {
                this.router.navigateByUrl('home');
            } else {
                this.alertController.create({
                    header: '警告',
                    buttons: ['确定']
                }).then((alert) => {
                    alert.message = ajaxResult.error.message;
                    alert.present();
                });
            }
        });
    }

    onForgotPassword() {
        this.router.navigateByUrl('passport/forgot-password');
    }

    ngOnInit() {
    }

}
