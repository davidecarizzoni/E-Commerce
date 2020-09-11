import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { getCurrentUser } from 'src/app/redux/users';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store, private router: Router) {}

  id: number;

  logout(){
    sessionStorage.setItem("user", '');
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    console.log(this.id);
  }

}