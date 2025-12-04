import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details/product-details.service';
import { ProductObject } from '../../core/models/products/product-object.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  // Services
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  productId: string | null = null;
  productData: ProductObject = {} as ProductObject;
  ngOnInit(): void {
    this.getProductDetailsParams();
    this.getProductDetailData();
  }
  getProductDetailsParams(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramsUrl) => {
        this.productId = paramsUrl.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getProductDetailData(): void {
    this.productDetailsService.getProductDetails(this.productId).subscribe({
      next: (res) => {
        this.productData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProductToCart(): void {
    this.cartService.postAddProductToCart(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message);
        }
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.message);
      },
    });
  }
}
