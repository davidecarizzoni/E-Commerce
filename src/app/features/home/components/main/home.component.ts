import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { getCurrentUser } from 'src/app/redux/users';
import { Router } from '@angular/router';
import { Clothes } from 'src/app/core/model/clothes.interface';
import { selectClothes } from 'src/app/redux/clothes';
import { retrieveAllClothes } from 'src/app/redux/clothes/clothes.action';
import { retrieveAllUsers } from 'src/app/redux/users/users.action';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  id: number;

  constructor(private store: Store, private router: Router) {
    this.id=1;
  }

  get clothes(): Observable<Clothes[]> {
    return this.store.pipe(select(selectClothes));
  }

  logout(){
    sessionStorage.setItem("user", '');
    this.router.navigateByUrl('/login');
  }

  productId(n:number){
    this.id = n;
    console.log(this.id);
  }

  ngOnInit(): void {
    console.log(this.id);
  }

}