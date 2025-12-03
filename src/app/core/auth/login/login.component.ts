import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [InputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Services
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  // Properties
  loginForm!: FormGroup;
  subscribe: Subscription = new Subscription();
  isLoading: boolean = false;

  // Functions
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }
  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.subscribe.unsubscribe();
      this.subscribe = this.authService.postSignIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          if (res.message === 'success') {
            this.toastrService.success('loggedIn Successfully');
            this.router.navigate(['/home']);
            this.cookieService.set('token', res.token);
          }
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error(err.error.message);
          this.isLoading = false;
        },
      });
      console.log();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
