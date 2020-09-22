import { HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpCommunicationsService } from 'src/app/core/http-communication/http-communication.service';
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
  totPrice: number = 0;

  get cartItem(): Observable<CartItem[]> {
    return this.store.pipe(select(getCartItem));
  }

  constructor(private store: Store, private fb:FormBuilder, private http: HttpCommunicationsService, private router:Router) { 
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
    this.getTotalPrice();
  }

  next(){ this.prosegui+= 1; }
  back(){ this.prosegui-= 1; }


  remove(id:number, price: number){
    var copy = Array.from(this.cart);
    const index = copy.findIndex(x=> x.id=== id);
    copy.splice(index,1);
    this.cart = copy;
    this.totPrice-=price;
    this.updateCart(this.cart);
  }

  getTotalPrice(){
    this.cart.forEach(cartItem => {
      this.totPrice+= cartItem.price;
    })
  }

  updateCart(cart: CartItem[] ){
    this.store.dispatch(initCart({cart}));
  }

  deleteCurrentCart(){
    let cart: CartItem[] = [];
    this.store.dispatch(initCart({cart}));
  }

  submitForm(){
    console.log("Shipping for submitted" + this.shippingForm.value)
  }

  
  sendEmail(){
    let message:string="Hai acquistato sullo store di Davide\n Prezzo: "+ this.totPrice+ "\n";
    let indirizzo = this.shippingForm.get('indirizzo').value;
    let città = this.shippingForm.get('città').value;
    let CAP = this.shippingForm.get('cap').value;
    let user = this.shippingForm.get('nome').value;
    
    message+="Cart detail:\n"
    this.cart.forEach(cartItem => {
      message+= cartItem.name +" "+ cartItem.color +" "+ cartItem.price +"\n";
    });

    message+= "Shipping detail:\n"
    message+= "Indirizzo: "+ indirizzo +" Città: "+ città +" CAP:" + CAP;
    
    //this.router.navigateByUrl('/home');
    this.next();
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.sendMail('https://formspree.io/xvovoaow',
        { name: user, replyto: 'davidecarizzoni@gmail.com', message: message},
        { 'headers': headers }).subscribe(
          response => {
            console.log(response+" risposta");
          }
        );
    
  }

  logout(){
    sessionStorage.setItem("user", '');
    this.router.navigateByUrl('/login');
  }
}
