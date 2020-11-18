export interface Product {
    id: string;
    name: string;
    categoryId: number;
    categoryName: string;
    category: any;
    barcode: string;
    images: string[];
    price: number;
    purchasePrice: number;
    inventory: number;
    standard: string;
    remark: string;
}
