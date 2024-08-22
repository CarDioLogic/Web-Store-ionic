import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonHeader,
  IonTextarea,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonNote,
  IonImg,
  IonMenu,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonInput,
  IonToggle,
  IonBackButton,
} from '@ionic/angular/standalone';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { MainMenuComponent } from 'src/app/components/main-menu/main-menucomponent';

@Component({
  standalone: true,
  selector: 'app-upsert-product',
  imports: [
    IonTextarea,
    IonBackButton,
    HttpClientModule,
    IonToggle,
    IonInput,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonNote,
    IonImg,
    ReactiveFormsModule,
    IonMenu,
    IonButtons,
    IonButton,
    MainMenuComponent,
    IonMenuButton,
  ],
  templateUrl: './upsert-product.component.html',
  styleUrls: ['./upsert-product.component.scss'],
  providers: [ProductsService],
})
export class UpsertProductComponent implements OnInit {
  criarForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    image: new FormControl(''),
    isActive: new FormControl(false),
  });
  imageUrl: any;
  productId: number = 0;

  isEditForm: boolean = false;
  pageTitle: string = 'Novo produto';
  buttonText: string = 'Criar';

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.isEditForm = true;
        this.loadProduto(this.productId);
        this.pageTitle = 'Editar produto';
        this.buttonText = 'Editar';
      }
    });
  }

  handleFormSubmit(): void {
    console.table(this.criarForm.value);
    this.CheckForImage();

    if (this.isEditForm === false) {
      //logic to create product
      if (this.criarForm.valid) {
        this.productService.createProduct(this.criarForm.value).subscribe({
          next: (product: any) => {
            console.log('Created product: ', product);
            this.router.navigate(['gestao-produtos']);
          },
        });
      }
    } else if (this.isEditForm === true) {
      if (this.criarForm.valid) {
        this.productService
          .editProduct(this.criarForm.value, this.productId)
          .subscribe({
            next: (product: any) => {
              console.log('Edited product: ', product);
              this.router.navigate(['gestao-produtos']);
            },
          });
      }
    }
  }

  openCamera() {
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        height: 512,
        width: 512,
      });
      this.imageUrl = image.base64String ?? '';
      this.imageUrl = 'data:image/jpeg;base64,' + this.imageUrl;
      this.criarForm.controls['image'].setValue(this.imageUrl);
    };
    takePicture();
  }

  loadProduto(productId: number) {
    this.productService.getProductsById(productId).subscribe({
      next: (product: any) => {
        this.criarForm.controls['name'].setValue(product.name);
        this.criarForm.controls['description'].setValue(product.description);
        this.criarForm.controls['price'].setValue(product.price);
        this.criarForm.controls['image'].setValue(product.image);
        this.criarForm.controls['isActive'].setValue(product.isActive);
      },
    });
  }

  CheckForImage() {
    console.log(this.criarForm.controls['image'].getRawValue());
    if (!this.criarForm.controls['image'].getRawValue()) {
      //default image if none is selected
      let url =
        'https://www.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg';
      this.criarForm.controls['image'].setValue(url);
    }
  }
}
