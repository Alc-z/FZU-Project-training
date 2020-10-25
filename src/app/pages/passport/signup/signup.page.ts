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

  signup: Signup = {
    phone: '',
    email: '',
    shopName: '',
    password: '',
    confirmPassword: '',
    code: ''
  };
  submited: boolean;
  validated: boolean;
  validateCode: string;

  constructor(private authenticationCodeService: AuthenticationCodeService) { }

  ngOnInit() {
    // this.signupSlides.lockSwipes(true);
  }
  onNext() {
    this.signupSlides.slideNext();
  }
  onPrevious() {
    this.signupSlides.slidePrev();
  }

  onSlideDidChange() {
    this.signupSlides.getActiveIndex().then((index) => {
      this.slideIndex = index;
    });
  }

  onPhoneSubmit(form: NgForm) {
    this.submited = true;
    if (form.valid) { // 已通过客户端验证
      this.validateCode = this.authenticationCodeService.createCode(4, 10);
      console.log('validateCode:' + this.validateCode);
      this.signupSlides.slideNext();
    }
  }

  onCodeSubmit(form: NgForm) {
    console.log(this.signup.code);
    this.validated = this.authenticationCodeService.validate(this.signup.code);
    console.log('validated:' + this.validated);
  }

  isActive(index: number): boolean {
    return this.slideIndex === index;
  }
}
