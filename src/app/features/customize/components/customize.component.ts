import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CartItem } from 'src/app/core/model/cart-item.interface';
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

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.subscription.add(this.route.params.pipe(
      filter(params => params != null && params['id'] != null),
      switchMap(params => this.store.pipe(select(getClothesById, { id: Number(params['id']) }))),
    ).subscribe(clothes => {
      this.clothes = clothes;
      console.log(this.clothes)
    }));
  }

  undo() {
    this.clothes = this.clothes;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
