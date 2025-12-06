import { Component, inject, OnInit } from '@angular/core';
import { AllordersService } from './services/allorders.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly allordersService = inject(AllordersService);
  decode: any = this.allordersService.decodeToken();
  userId: string = this.decode?.id;
  userOrdersList: Userorder[] = [];
  ngOnInit(): void {
    this.getUserCartProducts();
  }

  getUserCartProducts(): void {
    this.allordersService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.userOrdersList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
