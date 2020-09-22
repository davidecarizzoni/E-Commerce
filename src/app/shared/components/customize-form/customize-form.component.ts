import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/core/model/cart-item.interface';
import { clothesReducer } from 'src/app/redux/clothes/clothes.reducers';

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
      this.imgPath= this.clothes.imgPath
      this.clothesForm = this.fb.group({
        id: this.clothes.id,
        imgPath: this.changeColor(this.clothes.color),
        name: [this.clothes.name, Validators.required],
        color: [this.clothes.color, Validators.required],
        text: [this.clothes.text, Validators.required],
        textColor: [this.clothes.textColor, Validators.required],
      });
    }
  }
  
 constructor(private fb: FormBuilder, private router: Router) {
    this.clothesForm = this.fb.group({
      id:'',
      imgPath:'',
      color: ['',Validators.required],
      text: ['',Validators.required],
      textColor: ['',Validators.required],
    });
  }

  goToCustomize(id: number){
    this.router.navigate(['/customize', id-1]);
  }

  changeColor(color: string){
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
