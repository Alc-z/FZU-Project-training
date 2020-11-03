import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


    public sales = [];
    public data = [
        {
            text: '新增商品',
            icon: '<ion-icon name="apps"></ion-icon>',
            url: '/addProduct'
        },
        {
            text: '新增会员',
            icon: 'apps',
            url: ''
        },
    ];
    public shortcuts = [
        {
            text: '新增商品',
            icon: 'apps',
            url: '/addProduct'
        },
        {
            text: '新增会员',
            icon: 'apps',
            url: ''
        },
        {
            text: '收账记录',
            icon: 'apps',
            url: ''
        },
        {
            text: '支出管理',
            icon: 'apps',
            url: ''
        },
        {
            text: '商品管理',
            icon: 'apps',
            url: ''
        },
        {
            text: '会员管理',
            icon: 'apps',
            url: ''
        },
        {
            text: '查询销售',
            icon: 'apps',
            url: ''
        },
        {
            text: '智能分析',
            icon: 'apps',
            url: ''
        },
        {
            text: '供货商管理',
            icon: 'apps',
            url: ''
        },
        {
            text: '挂单',
            icon: 'apps',
            url: ''
        },
        {
            text: '高级功能',
            icon: 'apps',
            url: ''
        },
    ];


    constructor(private menuController: MenuController) {
        this.genData();
    }

    ngOnInit() {
        // ionViewWillEnter(){
        //   this.menuController.enable(false);
        // }

        // ionViewDidLeave(){
        //   this.menuController.enable(true);
        // }
    }

    /**
     *
     *
     * @param {number} current 当前销售数据
     * @param {number} previous 前期销售数据
     * @returns {number} 1 增长 0 持平 -1 减少
     * @memberof HomePage
     */
    public minus(current: number, previous: number): number {
        const result = current - previous;
        if (result > 0) {
            return 1;
        } else if (result === 0) {
            return 0;
        } else {
            return -1;
        }
    }

    private random(): number {
        let x = 100.00;
        let y = 0;
        let rand = (Math.random() * (x - y + 1) + y) * 100 / 100;
        return rand;
    }

    private genData() {
        let a = this.random();
        let b = this.random();

        const sale1 = new Sale();
        sale1.title = '今天';
        sale1.content = '比昨日:';
        sale1.current = a;
        sale1.previous = b;
        sale1.difference = a - b;
        this.sales.push(sale1);

        a = this.random();
        b = this.random();
        const sale2 = new Sale();
        sale2.title = '七日';
        sale2.content = '比向期:';
        sale2.current = a;
        sale2.previous = b;
        sale2.difference = a - b;
        this.sales.push(sale2);

        a = this.random();
        b = this.random();
        const sale3 = new Sale();
        sale3.title = '本月';
        sale3.content = '比向期:';
        sale3.current = a;
        sale3.previous = b;
        sale3.difference = a - b;
        this.sales.push(sale3);
    }

}
class Sale {
    title: string;
    content: string;
    current: number;
    previous: number;
    difference: number;
}
