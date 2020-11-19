import { ShopService } from './../setting/shop/shop.service';
import { T_USER, UserService } from './user.service';
import { ChangePasswordPage } from './../setting/change-password/change-password.page';
import { LoginLog } from './login-log';
import { AjaxResult } from './../../shared/class/ajax-result';
import { LoginAccount } from './LoginAccount';
import { User } from './user';
import { Signup } from './signup';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Shop } from '../setting/shop/shop';



export const T_ACCOUNT = 'TAccount';
export const T_LOGIN_LOG = 'TLoginLog';
@Injectable({
    providedIn: 'root'
})
export class PassportService {
    private id: number;

    constructor(
        private localStorageService: LocalStorageService,
        private userService: UserService,
        private shopService: ShopService
    ) { }

    async signupUser(signup: Signup) {
        if (this.isUniquePhone(signup.phone)) {
            // 记录用户id
            this.id = this.localStorageService.get(T_USER, []).length + 1;

            const user = new User();
            user.id = this.id;
            user.shopName = signup.shopName;
            user.phone = signup.phone;
            user.email = signup.email;
            user.createTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            this.userService.addUser(user);
            this.addLoginAccount(signup, user);

            const shop = new Shop();
            shop.shopName = signup.shopName;
            shop.phone = signup.phone;
            shop.email = signup.email;
            this.shopService.addShop(shop);

            return new AjaxResult(true, null);
        } else {
            return new AjaxResult(false, null, {
                message: '您的手机号码已经被注册',
                details: ''
            });
        }
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

    getLoginAccountsByUserId(userId: number): LoginAccount[] {
        const loginAccountArr: LoginAccount[] = this.localStorageService.get(T_ACCOUNT, new Array());
        const result: LoginAccount[] = [];
        loginAccountArr.forEach(item => {
            if (item.userId === userId) {
                result.push(item);
            }
        });
        return result;
    }

    getLoginAccounts(): LoginAccount[] {
        return this.localStorageService.get(T_ACCOUNT, new Array());
    }

    addLoginLog(loginLog: LoginLog) {
        const loginLogDto: LoginLog[] = this.localStorageService.get(T_LOGIN_LOG, []);
        loginLogDto.push(loginLog);
        if (loginLogDto.length > 10) {
            loginLogDto.pop();
        }
        this.localStorageService.set(T_LOGIN_LOG, loginLogDto);
    }

    getLoginLog(): LoginLog {
        const loginLogArr = this.localStorageService.get(T_LOGIN_LOG, []);
        if (loginLogArr.length <= 0) {
            return null;
        }
        return loginLogArr[loginLogArr.length - 1];
    }

    async ChangePasswordPage(input: any) {
        const loginAccArr = this.getLoginAccounts();
        loginAccArr.forEach(item => {
            if (item.userId === input.userId) {
                item.credential = input.password;
            }
        });
        this.localStorageService.set(T_ACCOUNT, loginAccArr);
    }

    /**
     * 修改密码时候的验证
     * @param input
     */
    async validationPassword(input: any) {
        const loginAccount = this.getLoginAccountsByUserId(input.userId);

        console.log('input', input);
        console.log('crediential', loginAccount[0].credential);
        console.log('oldPassword', input.oldPassword);
        // console.log('result', loginAccount != null && loginAccount.credential === input.oldPassword);
        return loginAccount != null && loginAccount[0].credential === input.oldPassword;
    }

    async login(input: any) {
        const loginAccount = this.getLoginAccount(input.identifier);
        // console.log('login credential', loginAccount.credential);
        // console.log('login password', input.password);

        if (loginAccount != null && loginAccount.credential === input.password) {
            input.userId = loginAccount.userId;
            input.date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            input.password = ''; // 日志清楚用户输入的密码
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

    cleanLog() {
        this.localStorageService.set(T_LOGIN_LOG, []);
    }
}
