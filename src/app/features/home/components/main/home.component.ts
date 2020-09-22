import { select, Store} from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/model/cart-item.interface';
import { getCartItem } from 'src/app/redux/cart';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  id: number;

  constructor(private store: Store, private router: Router) {
    this.id = 0;
  }

  get cartItem(): Observable<CartItem[]> {
    return this.store.pipe(select(getCartItem));
  }

  currentClothesId(n:number){
    this.id = n;
  }

  goToCustomize(){
    this.router.navigate(['/customize', this.id]);
  }

  ngOnInit(): void {}

}