import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { UserCartdata } from './models/user-cartdata.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  userCartDetails: UserCartdata = {} as UserCartdata;

  ngOnInit(): void {
    this.getLoggedUserCart();
  }
  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.userCartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeItemFromUserCart(productId: string): void {
    this.cartService.removeItemFromCart(productId).subscribe({
      next: (res) => {
        this.userCartDetails = res.data;
        this.toastrService.warning('Product Deleted!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  editItemFromUserCart(productId: string, count: number): void {
    this.cartService.putCartItemCount(productId, count).subscribe({
      next: (res) => {
        this.userCartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeAllItemsFromUserCart(): void {
    this.cartService.deleteAllCartItems().subscribe({
      next: (res) => {
        this.getLoggedUserCart();
        this.toastrService.warning('Cart Clear!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
