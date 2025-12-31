import { Component, inject, OnInit } from '@angular/core';

import { ProductService } from '../../core/services/product/product.service';
import { ProductObject } from '../../core/models/products/product-object.interface';
import { CardComponent } from '../../shared/components/card/card.component';
import { SearchPipe } from '../../shared/pipes/search/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductSkeletonComponent } from '../../shared/components/skeletons/product-skeleton/product-skeleton.component';
@Component({
  selector: 'app-products',
  imports: [CardComponent, SearchPipe, FormsModule, NgxPaginationModule, ProductSkeletonComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private readonly productService = inject(ProductService);
  productList: ProductObject[] = [];
  productLoading: boolean = false;
  text: string = '';
  pageSize!: number;
  p!: number;
  total!: number;
  productSize = 20;
  skeletonArray = Array(this.productSize);
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(pageNumber: number = 1): void {
    this.productLoading = true;
    this.productService.getProducts(pageNumber).subscribe({
      next: (res) => {
        this.productList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
        this.productLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.productLoading = false;
      },
    });
  }
}
