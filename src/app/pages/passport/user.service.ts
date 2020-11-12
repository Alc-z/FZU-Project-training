import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { User } from './user';

export const T_USER = 'TUser';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private localStorageService: LocalStorageService) { }

    getUser(id: number): User {
        const userArr: User[] = this.localStorageService.get(T_USER, new Array());
        return userArr[id - 1];
    }

    addUser(user: User) {
        const users = this.localStorageService.get(T_USER, []);
        users.push(user);
        this.localStorageService.set(T_USER, users);
    }
}
