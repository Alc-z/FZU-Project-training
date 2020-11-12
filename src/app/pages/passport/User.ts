import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class User {
    id: number;
    shopName: string;
    phone: string;
    email: string;
    createTime: string;
}


