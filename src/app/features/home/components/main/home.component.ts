import { Store} from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



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

  currentClothesId(n:number){
    this.id = n;
  }

  goToCustomize(){
    this.router.navigate(['/customize', this.id]);
  }

  ngOnInit(): void {
    console.log(this.id);
  }

}