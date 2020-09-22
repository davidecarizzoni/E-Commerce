import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/core/model/cart-item.interface';

@Component({
  selector: 'app-customize-form',
  templateUrl: './customize-form.component.html',
  styleUrls: ['./customize-form.component.scss']
})
export class CustomizeFormComponent implements OnInit {

  @Input()
  clothes: CartItem;

  @Output()
  formSubmitEvent: EventEmitter<CartItem> = new EventEmitter();

  @Output()
  undoEvent: EventEmitter<CartItem> = new EventEmitter();

  clothesForm: FormGroup;
  imgPath: string;
  
  ngOnInit(): void {
    if(this.clothes != null){
      this.setPathImage(this.clothes.color);
      this.clothesForm = this.fb.group({
        id: this.clothes.id,
        name: [this.clothes.name, Validators.required],
        color: [this.clothes.color, Validators.required],
        text: [this.clothes.text, Validators.required],
        textColor: [this.clothes.textColor, Validators.required],
        price: [this.clothes.price, Validators.required],
      });
    }
  }
  
 constructor(private fb: FormBuilder, private router: Router) {
    this.clothesForm = this.fb.group({
      id:'',
      color: ['',Validators.required],
      text: ['',Validators.required],
      textColor: ['',Validators.required],
    });
  }

  setPathImage(color: string){
    this.imgPath = "/assets/product/" + this.clothes.id + "_" + color + ".jpg";
  }

  confirmChanges() {
    this.formSubmitEvent.emit(this.clothesForm.value);
  }

  cancel() {
    this.clothesForm.reset();
    this.ngOnInit();
  }

}
