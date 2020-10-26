import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // root所有模块都能用到，相当于不需要import
})
export class LocalStorageService {
  // 所有浏览器都支持 window 对象。它代表浏览器的窗口。所有全局 JavaScript 对象，函数和变量自动成为 window 对象的成员。
  private storage = window.localStorage;
  constructor() { }

  // key: 表名
  get(key: string, defaultValue: any): any {
    let value: any;
    if (key === null || key === '') {
      return null;
    }
    // let变量声明和var最大的不同点就是变量的作用域不一样。var为函数作用域，而let变量声明的为块作用域（block-scoping）。
    // 块作用域会把声明的变量限定在代码块（如使用{}括起来的代码库）或者for循环内，而不是整个函数体。
    value = this.storage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }

    // === 类型和值一样
    if (value === null && defaultValue) {
      value = defaultValue;
    }
    return value;
  }

  set(key: string, value: any): void {
    if (key === null || key === '') {
      throw new Error('invalid key');
    }
    // 将 JavaScript 值转换为 JSON 字符串
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    if (key === null || key === '') {
      throw new Error('invalid key');
    }
    this.storage.removeItem(key);
  }
}
