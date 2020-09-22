import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/model/cart-item.interface';
import { getCartItem } from 'src/app/redux/cart';
import { removeItemToCartById } from 'src/app/redux/cart/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  prosegui: number;
  imgPath: string;
  shippingForm: FormGroup;
  paymentForm: FormGroup;

  @Input() img: string;

  get cartItem(): Observable<CartItem[]> {
    return this.store.pipe(select(getCartItem));
  }

  constructor(private store: Store, private fb:FormBuilder) { 
    this.shippingForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      cellulare: ['', Validators.required],
      città: ['', Validators.required],
      cap: ['', Validators.required],
      indirizzo: ['', Validators.required],
      n: ['', Validators.required],
      information: ['', Validators.required],
    })

    this.paymentForm = this.fb.group({
      carta: ['', Validators.required],
      tipo: ['', Validators.required],
      numero: ['', Validators.required],
      CVC: ['', Validators.required]
    })

  }


  ngOnInit(): void {
    this.prosegui= 0;
  }

  next(){
    this.prosegui+= 1;
    console.log(this.prosegui)
  }

  back(){
    this.prosegui-= 1;
    console.log(this.prosegui)
  }

  remove(id: number){
    this.store.dispatch(removeItemToCartById({id}));
  }

  submitForm(){
    console.log(this.shippingForm.value)
  }

  getImagePath(id: number, color: string){
    switch(id){
      case 0:
        console.log(color);
        this.imgPath =  "/assets/product/maglietta_" + color + ".jpg";
        console.log("case 0" + this.imgPath);
        break;
      case 1:
        this.imgPath =  "/assets/product/pantaloncini_" + color + ".jpg";
        console.log("case 1");
        break;
      case 2:
        this.imgPath =  "/assets/product/felpa" + color + ".jpg";
        console.log("case 2");
        break;
      }
  }

}
