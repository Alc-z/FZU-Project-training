import { AjaxResult } from './../../shared/class/ajax-result';
import { UserValidation } from './user-validation';
import { element } from 'protractor';
import { LoginAccount } from './LoginAccount';
import { User } from './User';
import { Signup } from './signup';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class PassportService {
    private storage = window.localStorage;
    private id: number;

    constructor(private localStorageService: LocalStorageService) {
    }

    async signupUser(signup: Signup) {
        if (this.isUniquePhone(signup.phone)) {
            const userArr: User[] = this.localStorageService.get('User', new Array());
            this.id = userArr.length + 1;
            console.log('id:' + this.id);

            const user = new User();
            user.id = this.id;
            user.phone = signup.phone;
            user.email = signup.email;
            user.createTime = new Date();

            userArr.push(user);
            this.localStorageService.set('User', userArr);

            this.addLoginAccount(signup, user);
            return new AjaxResult(true, null);
        } else {
            return new AjaxResult(false, null, {
                message: '您的手机号码已经被注册',
                details: ''
            });
        }
    }

    insertUser(user: User) {

    }

    getUser(id: number): User {
        const userArr: User[] = this.localStorageService.get('User', new Array());
        if (id >= this.id) {
            throw new Error('id 超出范围');
        }
        return userArr[id];
    }

    isUniquePhone(phone: string): boolean {
        const userArr: User[] = this.localStorageService.get('User', []);
        userArr.forEach(item => {
            if (item.phone === phone) {
                return false;
            }
        });
        return true;
    }

    addLoginAccount(signup: Signup, user: User) {
        const loginAccountArr: LoginAccount[] = this.localStorageService.get('LoginAccount', new Array());

        const loginPhone = new LoginAccount();
        loginPhone.userId = user.id;
        loginPhone.identifier = user.phone;
        loginPhone.credential = signup.password;

        loginAccountArr.push(loginPhone);

        const loginEmail = new LoginAccount();
        loginEmail.userId = user.id;
        loginEmail.identifier = user.email;
        loginEmail.credential = signup.password;
        loginAccountArr.push(loginEmail);

        this.localStorageService.set('LoginAccount', loginAccountArr);
    }

    getLoginAccount(identifier: string): LoginAccount {
        const loginAccountArr: LoginAccount[] = this.localStorageService.get('LoginAccount', new Array());
        let result: LoginAccount;
        loginAccountArr.forEach(item => {
            if (item.identifier === identifier) {
                result = item;
                return;
            }
        });
        return result;
    }

    // 只存最新登入的一个用户
    addUserValidation(userValidation: UserValidation) {
        this.localStorageService.set('UserValidation', userValidation);
    }

    getUserValidation(): UserValidation {
        return this.localStorageService.get('UserValidation', null);
    }

    async login(input: UserValidation) {
        const loginAccount = this.getLoginAccount(input.identifier);

        if (loginAccount != null && loginAccount.credential === input.passworrdToken) {
            input.userId = loginAccount.userId;
            input.date = new Date().getTime().toString();
            this.addUserValidation(input);
            return new AjaxResult(true, null);
        }
        return new AjaxResult(false, null, { message: '用户密码不正确', details: '' });
    }

    isExpired(): boolean {
        const logDate = parseInt(this.getUserValidation().date);
        const current = new Date().getTime();
        // console.log('time:', (current - logDate) / (60 * 60 * 24 * 1000));
        return (current - logDate) / (60 * 60 * 24 * 1000) > 5;
    }
}
