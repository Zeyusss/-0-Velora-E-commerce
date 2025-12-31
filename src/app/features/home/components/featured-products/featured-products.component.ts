import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { ProductObject } from '../../../../core/models/products/product-object.interface';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProductSkeletonComponent } from '../../../../shared/components/skeletons/product-skeleton/product-skeleton.component';

@Component({
  selector: 'app-featured-products',
  imports: [CardComponent, ProductSkeletonComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
})
export class FeaturedProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  productList: ProductObject[] = [];
  productLoading: boolean = false;
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productLoading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productLoading = false;
        this.productList = res.data;
      },
      error: (err) => {
        this.productLoading = false;
        console.log(err);
      },
    });
  }
}
