import { Component, OnInit } from '@angular/core';
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
  shippingForm: FormGroup;
  paymentForm: FormGroup;

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

  get cartItem(): Observable<CartItem[]> {
    return this.store.pipe(
      //tap(items => console.log(JSON.stringify(items))),
      select(getCartItem));
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

}
