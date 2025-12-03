import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [InputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  // Services
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  // Properties
  registerForm!: FormGroup;
  subscribe: Subscription = new Subscription();
  isLoading: boolean = false;

  // Functions
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required]],
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
        rePassword: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        phone: [null, [Validators.required, Validators.pattern(/^01[0-2,5][0-9]{8}$/)]],
      },
      { validators: [this.confirmPassword] }
    );
  }
  confirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }
  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.subscribe.unsubscribe();
      this.subscribe = this.authService.postSignUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === 'success') {
            this.toastrService.success('Registered Successfully');
            this.router.navigate(['/login']);
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
      this.registerForm.markAllAsTouched();
    }
  }
}
