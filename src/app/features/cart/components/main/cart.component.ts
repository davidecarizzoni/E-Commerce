import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/model/cart-item.interface';
import { getCartItem } from 'src/app/redux/cart';
import { initCart } from 'src/app/redux/cart/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  prosegui: number;
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  cart: CartItem[];

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
    this.cartItem.forEach(cartItems => {
      this.cart = cartItems;
    });
  }

  next(){ this.prosegui+= 1; }
  back(){ this.prosegui-= 1; }


  remove(id:number){
    console.log(id)
    var copy = Array.from(this.cart);
    const index = copy.findIndex(x=> x.id=== id);
    copy.splice(index,1);
    this.cart = copy;
    this.updateCart(this.cart);
  }


  updateCart(cart: CartItem[] ){
    this.store.dispatch(initCart({cart}));
  }

  submitForm(){
    console.log(this.shippingForm.value)
  }
}
