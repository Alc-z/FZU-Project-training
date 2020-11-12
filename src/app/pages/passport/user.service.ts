import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { User } from './user';
import { T_USER } from './passport.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private localStorageService: LocalStorageService) { }

    getUser(id: number): User {
        const userArr: User[] = this.localStorageService.get(T_USER, new Array());
        return userArr[id];
    }

}
