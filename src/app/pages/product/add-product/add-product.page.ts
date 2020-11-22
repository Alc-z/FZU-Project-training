import { Product } from './../product';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.page.html',
    styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit, OnDestroy {

    product: Product;
    subscription: Subscription;

    cameraOpt: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };

    private imagePickerOpt = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        enodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: 0
    };

    constructor(
        private productService: ProductService,
        private router: Router,
        private alertCtrl: AlertController,
        private categoryService: CategoryService,
        private zone: NgZone,
        private camera: Camera,
        private barcodeScanner: BarcodeScanner,
        private actionSheetCtrl: ActionSheetController,
    ) {
        this.initProduct();
        this.subscription = categoryService.watchCategory().subscribe(
            (activeCategory) => {
                this.product.categoryName = activeCategory.name;
                this.product.category = activeCategory;
                this.product.categoryId = activeCategory.id;
            },
            (error) => {
            }
        );
    }

    ngOnInit() {
    }

    private initProduct(): void {
        this.product = {
            id: '',
            name: '',
            categoryId: null,
            categoryName: '',
            category: null,
            barcode: '',
            images: [],
            price: null,
            purchasePrice: null,
            inventory: null,
            standard: '',
            remark: ''
        };
    }

    async onSave(ct: boolean = false) {
        if (this.product.images.length <= 0) {
            
        }

        this.productService.insert(this.product).then(async (data) => {
            if (data.success) {
                const alert = await this.alertCtrl.create({
                    header: '提示',
                    message: '添加成功',
                    buttons: ['确定']
                });
                alert.present();
                if (ct) {
                    this.initProduct();
                    this.product.categoryName = '';
                } else {
                    this.router.navigateByUrl('/home');
                }
            } else {
                const alert = await this.alertCtrl.create({
                    header: '提示',
                    message: '添加失败',
                    buttons: ['确定']
                });
                alert.present();
            }
        });
    }

    async onPresentActiveSheet() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: '选择您的操作',
            buttons: [
                {
                    text: '拍照',
                    role: 'destructive',
                    handler: () => {
                        console.log('进入相机');
                        this.onCamera();
                    }
                }, {
                    text: '相册',
                    handler: () => {
                        console.log('进入相册');
                        this.onImagePicker();
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await actionSheet.present();
    }

    onCamera() {
        this.camera.getPicture(this.cameraOpt).then((imageData) => {
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.product.images.push(base64Image);
        }, (err) => {
            console.log('ERROR:' + err);
        });
    }

    onImagePicker() {
        this.camera.getPicture(this.imagePickerOpt).then((results) => {
            for (const res of results) {
                const base64Image = 'data:image/jpeg;base64,' + res;
                console.log('Image URI: ' + res);
                this.product.images.push(base64Image);
            }
        }, (err) => {
            console.log('ERROR:' + err);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    gotoPage(str: string): void {
        this.router.navigateByUrl(str);
    }

    gotoCategyList() {
        this.router.navigate(['/product/category-list'], {
            queryParams: {
                tab: 'FromProductAdd'
            }
        });
    }

    onScan() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
            this.product.barcode = barcodeData.text;
        }).catch(err => {
            console.log('Error', err);
        });
    }

}
