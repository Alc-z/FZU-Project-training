import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public sales = [
    {
      title: '令天',
      content: '比昨日:',
      current: 675.98,
      previous: 897.7,
      difference: 100
    }, {
      title: '七日',
      content: '比向期:',
      current: 675.98,
      previous: 457.7,
      difference: -100
    }, {
      title: '本月',
      content: '比向期:',
      current: 675.98,
      previous: 675.98,
      difference: 0
    }
  ];
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


  constructor(private menuController: MenuController) { }

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

}
class Sale {
  title: string;
  content: string;
  privious: number;
  current: number;
}