import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CartItem } from 'src/app/core/model/cart-item.interface';
import { getCartItem } from 'src/app/redux/cart';
import { addItemToCart } from 'src/app/redux/cart/cart.action';
import { getClothesById } from 'src/app/redux/clothes';


@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  @Input()
  clothes: CartItem;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) { }

  get cartItem(): Observable<CartItem[]> {
    return this.store.pipe(select(getCartItem));
  }

  ngOnInit(): void {
    this.subscription.add(this.route.params.pipe(
      filter(params => params != null && params['id'] != null),
      switchMap(params => this.store.pipe(select(getClothesById, { id: Number(params['id']) }))),
    ).subscribe(clothes => {this.clothes = clothes; }));
  }

  editForm(cartItem: CartItem) {
    this.store.dispatch(addItemToCart({cartItem}));
    this.router.navigateByUrl('/cart');
    this.clothes = cartItem;
  }

  undo() {
    this.clothes = this.clothes;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
