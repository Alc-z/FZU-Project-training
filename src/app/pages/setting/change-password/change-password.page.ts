import { SettingService } from './../setting.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PassportService } from './../../passport/passport.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

    isOldPassword = true;

    viewObject: any = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    constructor(
        private toastCtrl: ToastController,
        private passportService: PassportService,
        private router: Router,
        private settingservice: SettingService,
    ) { }

    ngOnInit() {
    }

    async onSave() {
        console.log('nmsl');
        const id = this.settingservice.user.id;
        const passport = {
            userId: id,
            oldPassword: this.viewObject.oldPassword,
            password: this.viewObject.newPassword,
        };
        console.log('passport', passport);

        let toast;
        this.passportService.validationPassword(passport).then(async result => {
            if (result) {
                this.passportService.ChangePasswordPage(passport);
                this.router.navigateByUrl('/setting');
                toast = await this.toastCtrl.create({
                    message: '修改成功',
                    duration: 2000
                });
            } else {
                this.isOldPassword = false;
                toast = await this.toastCtrl.create({
                    message: '修改失败',
                    duration: 2000
                });

            }
            await toast.present();
        });

    }
}
