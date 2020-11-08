import { Sale } from './../passport/sale';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    sales: Array<{ title: string, content: string, previous: number, current: number }>;
    shortcuts = [
        [
            { text: '新增商品', icon: 'add_salse', url: '/addProduct' },
            { text: '新增会员', icon: 'add_user', url: '/home' },
            { text: '收账记录', icon: 'sales_account', url: '/home' },
            { text: '支出管理', icon: 'a_note', url: '/home' },
        ], [
            { text: '商品管理', icon: 'sales_management', url: '/category-list' },
            { text: '会员管理', icon: 'user_management', url: '/home' },
            { text: '查询销售', icon: 'shop_management', url: '/home' },
            { text: '智能分析', icon: 'analysis', url: '/home' },
        ], [
            { text: '供应商管理', icon: 'gongying_more', url: '/home' },
            { text: '挂单', icon: 'guandan_more', url: '/home' },
            { text: '高级功能', icon: 'image_addsales', url: '/home' },
        ]
    ];

    constructor(private sale: Sale) {
        this.sales = [
            { title: '今日', content: '比昨日', previous: this.sale.getSales(), current: this.sale.getSales() },
            { title: '七日', content: '比同期', previous: this.sale.getSales(), current: this.sale.getSales() },
            { title: '本月', content: '比同期', previous: this.sale.getSales(), current: this.sale.getSales() }
        ];
    }
    ngOnInit(): void {
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
}
