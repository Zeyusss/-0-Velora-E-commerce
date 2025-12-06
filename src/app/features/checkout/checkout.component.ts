import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from './services/checkout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  // Services
  private readonly fb = inject(FormBuilder);
  private readonly checkoutService = inject(CheckoutService);
  private readonly activatedRoute = inject(ActivatedRoute);

  checkOutForm!: FormGroup;
  cartId: string | null = '';
  isLoading: boolean = false;
  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }
  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0-2,5][0-9]{8}$/)]],
        city: [null, Validators.required],
      }),
    });
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramUrl) => {
        this.cartId = paramUrl.get('cartId');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  submitCheckOut(): void {
    if (this.checkOutForm.valid) {
      this.isLoading = true;
      console.log();
      this.checkoutService.postCheckOutSession(this.cartId, this.checkOutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            this.isLoading = false;
            window.open(res.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
}
