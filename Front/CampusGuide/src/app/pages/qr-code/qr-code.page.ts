import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardTitle, IonCardHeader, IonCard, IonToast, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CartService } from 'src/app/services/cart.service';
import { HeaderModule } from "../../components/header/header/header.module";


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, CommonModule, FormsModule, HeaderModule]
})
export class QrCodePage implements OnInit {

  private cartService = inject(CartService);
  isToast = false;
  toastData: any = {};

  constructor() { }

  ngOnInit() {
    console.log("heyy");
  }

  async scanBarCode(){

    try{
      const code = await this.cartService.startscan();
      console.log(code)
    }
    catch(e){
      console.log(e)
    }
  }

  async scanAndPay() {
    try {
      const code = await this.cartService.startscan(0);
      console.log(code);
      if (!code) {
        this.isToast = true;
        this.toastData = {
          color: 'danger',
          message: 'Error! Please try again',
        };
        return;
      }

      this.isToast = true;
      this.toastData = {
        color: 'success',
        message: 'Payment successful',
      };
    } catch (e) {
      console.log(e);
    }
  }



}
