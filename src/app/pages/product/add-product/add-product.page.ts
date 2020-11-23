import { Product } from './../product';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.page.html',
    styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit, OnDestroy {

    product: Product;
    subscription: Subscription;
    text: string;

    cameraOpt: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };

    // imagePickerOpt: ImagePickerOptions = {
    //     quality: 50,
    //     maximumImagesCount: 3,
    //     outputType: 1,
    // };

    private imagePickerOpt = {
        quality: 50,
        destinationType: 0,
        enodingType: 0,
        mediaType: 0,
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
        private imagePicker: ImagePicker,
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
                        this.onCamera();
                    }
                }, {
                    text: '相册',
                    handler: () => {
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

    private onCamera() {
        this.camera.getPicture(this.cameraOpt).then((imageData) => {
            this.text = imageData;
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.product.images.push(base64Image);
        }, (err) => {
            console.log('ERROR:' + err);
        });
    }

    // private onImagePicker() {
    //     this.imagePicker.getPictures(this.imagePickerOpt).then((results) => {
    //         this.text = results.toString();
    //         for (let i = 0; i < results.length; i++) {
    //             const base64Image = 'data:image/jpeg;base64,' + results[i];
    //             this.product.images.push(base64Image);
    //         }
    //     }, (err) => {
    //         console.log('ERROR:' + err);
    //     });
    // }

    private onImagePicker() {
        this.camera.getPicture(this.imagePickerOpt).then((imageData) => {
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.product.images.push(base64Image);
        }, (err) => {
            console.log('ERROR:' + err);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    gotoPage(str: string) {
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
