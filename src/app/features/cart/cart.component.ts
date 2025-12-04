import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { UserCartdata } from './models/user-cartdata.interface';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  userCartDetails: UserCartdata = {} as UserCartdata;

  ngOnInit(): void {
    this.getLoggedUserCart();
  }
  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.userCartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
