import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem } from 'src/app/core/model/cart-item.interface';
import { getCartItem } from 'src/app/redux/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  prosegui:number;

  constructor(private store: Store) { }

  get cartItem(): Observable<CartItem[]> {
    return this.store.pipe(
      //tap(items => console.log(JSON.stringify(items))),
      select(getCartItem));
  }


  ngOnInit(): void {
    this.prosegui=0;
  }

  next(){
    this.prosegui+=1;
    console.log(this.prosegui)
  }
  back(){
    this.prosegui-=1;
    console.log(this.prosegui)
  }


}
