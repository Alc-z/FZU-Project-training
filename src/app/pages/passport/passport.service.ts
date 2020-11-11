import { LoginLog } from './login-log';
import { AjaxResult } from './../../shared/class/ajax-result';
import { LoginAccount } from './LoginAccount';
import { User } from './User';
import { Signup } from './signup';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';


export const T_USER = 'TUser';
export const T_ACCOUNT = 'TAccount';
export const T_LOGIN_LOG = 'TLoginLog';
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
            const userArr: User[] = this.localStorageService.get(T_USER, new Array());
            this.id = userArr.length + 1;
            console.log('id:' + this.id);

            const user = new User();
            user.id = this.id;
            user.phone = signup.phone;
            user.email = signup.email;
            user.createTime = new Date();

            userArr.push(user);
            this.localStorageService.set(T_USER, userArr);

            this.addLoginAccount(signup, user);
            return new AjaxResult(true, null);
        } else {
            return new AjaxResult(false, null, {
                message: '您的手机号码已经被注册',
                details: ''
            });
        }
    }

    getUser(id: number): User {
        const userArr: User[] = this.localStorageService.get(T_USER, new Array());
        if (id >= this.id) {
            throw new Error('id 超出范围');
        }
        return userArr[id];
    }

    isUniquePhone(phone: string): boolean {
        const userArr: User[] = this.localStorageService.get(T_USER, []);
        userArr.forEach(item => {
            if (item.phone === phone) {
                return false;
            }
        });
        return true;
    }

    addLoginAccount(signup: Signup, user: User) {
        const loginAccountArr: LoginAccount[] = this.localStorageService.get(T_ACCOUNT, new Array());

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

        this.localStorageService.set(T_ACCOUNT, loginAccountArr);
    }

    getLoginAccount(identifier: string): LoginAccount {
        const loginAccountArr: LoginAccount[] = this.localStorageService.get(T_ACCOUNT, new Array());
        let result: LoginAccount;
        loginAccountArr.forEach(item => {
            if (item.identifier === identifier) {
                result = item;
                return;
            }
        });
        return result;
    }


    addLoginLog(loginLog: LoginLog) {
        const loginLogDto: LoginLog[] = this.localStorageService.get(T_LOGIN_LOG, []);
        this.localStorageService.set(T_LOGIN_LOG, loginLog);
    }

    getLoginLog(): LoginLog {
        const loginLogArr = this.localStorageService.get(T_LOGIN_LOG, null);
        if (loginLogArr === null) {
            return null;
        }

        return loginLogArr[0];
    }

    async login(input: any) {
        const loginAccount = this.getLoginAccount(input.identifier);
        if (loginAccount != null && loginAccount.credential === input.password) {
            // if (loginAccount != null && loginAccount.credential === input.passwordToken) {
            input.userId = loginAccount.userId;
            input.date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            this.addLoginLog(input);
            return new AjaxResult(true, null);
        }
        return new AjaxResult(false, null, { message: '用户密码不正确', details: '' });
    }

    isExpired(): boolean {
        const loginLog = this.getLoginLog();
        if (loginLog === null) {
            return true;
        }
        const logDate = new Date(loginLog.date);
        const current = new Date();
        return (current.getTime() - logDate.getTime()) / (60 * 60 * 24 * 1000) > 5;
    }
}
