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

    addUser(signup: Signup) {
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
    }

    insertUser(user: User) {

    }

    getUser(id: number): User {
        const userArr: User[] = this.localStorageService.get('User', new Array());
        if (id >= this.id) {
            throw new Error('id 超出范围');
        }
        return userArr[id];
        // userArr.forEach(item => {
        //     if (item.id === id) {
        //         return item;
        //     }
        // });
        // return null;
    }

    isUniquePhone(phone: string): boolean {
        const userArr: User[] = this.localStorageService.get('User', new Array());
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

    getLoginAccount(identifier: string): boolean {
        const loginAccountArr: LoginAccount[] = this.localStorageService.get('LoginAccount', new Array());
        loginAccountArr.forEach(item => {
            if (item.identifier === identifier) {
                return true;
            }
        });
        return false;
    }
}
