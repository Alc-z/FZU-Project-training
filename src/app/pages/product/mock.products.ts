import { Product } from './product';

export const PRODUCTS: Product[] = [
    {
        id: '01bf8aa6-d83f-b590-006f-1d559a236d55',
        name: '垃圾袋',
        categoryId: 6,
        categoryName: '垃圾',
        category: {
            id: 6,
            name: '垃圾',
            children: [
                {
                    id: 61,
                    name: '干垃圾',
                    children: []
                }
            ]
        },
        barcode: '',
        images: [
            'data:image/jpg;base64,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'
        ],
        price: 2,
        purchasePrice: 1,
        inventory: 10,
        standard: 'm',
        remark: '小辣鸡呆'
    },
    {
        id: 'e2cb4064 - 2181 - 551f - 015f - b79e441550f2',
        name: '垃圾车',
        categoryId: 61,
        categoryName: '干垃圾',
        category: {
            id: 61,
            name: '干垃圾',
            children: []
        },
        barcode: '',
        images: [
            'data:image/jpg;base64,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'
        ],
        price: 100,
        purchasePrice: 50,
        inventory: 2,
        standard: 'L',
        remark: '大垃圾车'
    },
    {
        id: '5f8dc984 - e5da - 2673 - 43c5 - 274956103319',
        name: '垃圾桶',
        categoryId: 62,
        categoryName: '湿垃圾',
        category: {
            id: 62,
            name: '湿垃圾',
            children: []
        },
        barcode: '',
        images: [],
        price: 5,
        purchasePrice: 3,
        inventory: 20,
        standard: 'X',
        remark: '辣鸡'
    },
    {
        id: 'd3088221-e4a9-d8b5-8d51-d958e06adb62',
        name: '废品',
        categoryId: 6,
        categoryName: '垃圾',
        category: {
            id: 6,
            name: '垃圾',
            children: [
                {
                    id: 61,
                    name: '干垃圾',
                    children: []
                },
                {
                    id: 62,
                    name: '湿垃圾',
                    children: []
                }
            ]
        },
        barcode: '',
        images: [],
        price: 1,
        purchasePrice: 3,
        inventory: 3,
        standard: 'sasd',
        remark: 'lalalal'
    },
    {
        id: 'a2e35245-4a6c-4304-732e-6a2158d9bebf',
        name: '垃圾手套',
        categoryId: 6,
        categoryName: '垃圾',
        category: {
            id: 6,
            name: '垃圾',
            children: [
                {
                    id: 61,
                    name: '干垃圾',
                    children: []
                },
                {
                    id: 62,
                    name: '湿垃圾',
                    children: []
                }
            ]
        },
        barcode: '',
        images: [],
        price: 6,
        purchasePrice: 1,
        inventory: 6,
        standard: 'askjdh',
        remark: 'hahahaah'
    },
    {
        id: 'd9e81fc9-aa00-cd3c-1a35-d464d37a9ace',
        name: '扫把',
        categoryId: 62,
        categoryName: '湿垃圾',
        category: {
            id: 62,
            name: '湿垃圾',
            children: []
        },
        barcode: '',
        images: [],
        price: 54,
        purchasePrice: 51,
        inventory: 1,
        standard: 'jjjj',
        remark: 'jalkjd'
    },
    {
        id: 'cb2b3772-3da2-5eed-211c-29bc9f3fa582',
        name: '拖把',
        categoryId: 11,
        categoryName: '笔记本',
        category: {
            id: 11,
            name: '笔记本',
            children: []
        },
        barcode: '',
        images: [],
        price: 5454,
        purchasePrice: 515,
        inventory: 151,
        standard: 'asd',
        remark: '安静看书的话'
    },
    {
        id: '23a5e838-bc7a-3c85-fad5-134365bcae6c',
        name: '轮胎',
        categoryId: 31,
        categoryName: '鼠标',
        category: {
            id: 31,
            name: '鼠标',
            children: []
        },
        barcode: '',
        images: [],
        price: 1564,
        purchasePrice: 156,
        inventory: 5,
        standard: 'xc',
        remark: 'asdsa'
    },
    {
        id: '3d639414-4cac-6431-313f-2c6a63598acf',
        name: 'NAS',
        categoryId: 41,
        categoryName: '路由器',
        category: {
            id: 41,
            name: '路由器',
            children: []
        },
        barcode: '',
        images: [],
        price: 454,
        purchasePrice: 12,
        inventory: 6,
        standard: 'asdasdsad',
        remark: 'zxczx'
    },
    {
        id: '91015531-a4cd-41dd-45e4-70c82cd8de8b',
        name: '喇叭',
        categoryId: 33,
        categoryName: 'U盘',
        category: {
            id: 33,
            name: 'U盘',
            children: []
        },
        barcode: '',
        images: [],
        price: 32,
        purchasePrice: 45,
        inventory: 54,
        standard: 'zxccasd',
        remark: '阿瑟大时代'
    },
    {
        id: '16d5c540-63e8-ee4a-b0eb-3f720d06258c',
        name: '裤子',
        categoryId: 42,
        categoryName: '交换机',
        category: {
            id: 42,
            name: '交换机',
            children: []
        },
        barcode: '',
        images: [],
        price: 454,
        purchasePrice: 54,
        inventory: 352,
        standard: 'jkjhkj',
        remark: 'asd'
    }
];
