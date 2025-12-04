import { Component, inject, Input } from '@angular/core';
import { ProductObject } from '../../../core/models/products/product-object.interface';
import { TermPipe } from '../../pipes/term/term-pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [TermPipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  @Input() product!: ProductObject;

  addProductToCart(productId: string): void {
    this.cartService.postAddProductToCart(productId).subscribe({
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
