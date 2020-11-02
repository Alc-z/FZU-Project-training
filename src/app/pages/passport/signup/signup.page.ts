import { PassportService } from './../passport.service';
import { element } from 'protractor';
import { AuthenticationCodeService } from './../authentication-code.service';
import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Signup } from '../signup';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    // 字符串'signupSlides'和模板中的#signupSlides引用变量的名称一致
    @ViewChild('signupSlides', { static: false }) signupSlides: IonSlides;
    slideIndex = 0;
    phoneUnique: boolean;
    submited: boolean; // phone submit
    validated: boolean; // 用在验证码
    validateCode: string;
    pwStateTips: string;


    signup: Signup = {
        phone: '',
        email: '',
        shopName: '',
        password: '',
        confirmPassword: '',
        code: ''
    };

    // 验证码倒计时
    verifyCode: any = {
        verifyCodeTips: '获取验证码',
        countdown: 60,
        code: '',
        disable: true
    };

    constructor(private authenticationCodeService: AuthenticationCodeService, private passportService: PassportService) { }

    ngOnInit() {
        // this.signupSlides.lockSwipeToNext(true);
    }

    ngAfterViewInit() {
        this.signupSlides.lockSwipeToNext(true);
    }

    ionViewDidEnter() {

    }

    onNext() {
        this.signupSlides.lockSwipeToNext(false);
        this.signupSlides.slideNext();
        this.signupSlides.lockSwipeToNext(true);
    }
    onPrevious() {
        this.signupSlides.lockSwipeToNext(false);
        this.signupSlides.slidePrev();
        this.signupSlides.lockSwipeToNext(true);
    }

    onSlideDidChange() {
        this.signupSlides.getActiveIndex().then((index) => {
            this.slideIndex = index;
        });
    }

    // 倒计时
    settime() {
        if (this.verifyCode.countdown === 1) {
            this.verifyCode.countdown = 60;
            this.verifyCode.verifyCodeTips = '获取验证码';
            this.verifyCode.disable = true;
            return;
        } else {
            this.verifyCode.countdown--;
        }

        this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
        setTimeout(() => {
            this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
            this.settime();
        }, 1000);
    }

    onValidateCode(form: NgForm) {
        this.validated = this.authenticationCodeService.validate(this.signup.code);
        console.log('validated:' + this.validated);
    }

    getCode() {
        this.verifyCode.code = this.authenticationCodeService.createCode(4, 10);
        console.log('code:' + this.verifyCode.code);
        // 发送验证码成功后开始倒计时
        this.verifyCode.disable = false;
        this.settime();
    }

    onSubmitPhone(form: NgForm) {
        this.submited = true;
        if (form.valid) { // 验证手机号
            this.phoneUnique = this.passportService.isUniquePhone(this.signup.phone) ? true : false;
        }
    }

    onConfirmPassword() {
        if (this.signup.password === '') {
            this.pwStateTips = '请输入密码';
            return;
        }
        if (this.signup.confirmPassword === '') {
            this.pwStateTips = '请输入验证密码';
            return;
        }
        if (this.signup.confirmPassword === this.signup.password) {
            this.pwStateTips = '验证成功';
            return;
        }
        if (this.signup.confirmPassword !== this.signup.password) {
            this.pwStateTips = '密码不一致';
            return;
        }
        console.log('state:' + this.pwStateTips);
    }

    onInfoSubmit(form: NgForm) {
        this.passportService.signupUser(this.signup);
        this.onNext();
    }

    isActive(index: number): boolean {
        return this.slideIndex === index;
    }
}
