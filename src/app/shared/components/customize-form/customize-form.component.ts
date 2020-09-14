import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Clothes } from 'src/app/core/model/clothes.interface';

@Component({
  selector: 'app-customize-form',
  templateUrl: './customize-form.component.html',
  styleUrls: ['./customize-form.component.scss']
})
export class CustomizeFormComponent implements OnInit {

  @Input()
  clothes: Clothes;

  @Output()
  formSubmitEvent: EventEmitter<Clothes> = new EventEmitter();

  @Output()
  undoEvent: EventEmitter<Clothes> = new EventEmitter();

  clothesForm: FormGroup;
  

  
  ngOnInit(): void {
    console.log(this.clothes)
    if(this.clothes != null){
      this.clothesForm = this.fb.group({
        id:this.clothes.id,
        nome: [this.clothes.name, Validators.required],
        colore: [this.clothes.color, Validators.required],
        testo: [this.clothes.text, Validators.required],
        Ctesto: [this.clothes.textColor, Validators.required],
      });
    }
  }
  
  
  constructor(private fb: FormBuilder) {
    this.clothesForm = this.fb.group({
      id:'',
        nome: ['',Validators.required],
        colore: ['',Validators.required],
        testo: ['',Validators.required],
        Ctesto: ['',Validators.required],
    });
  }

  confirmChanges() {
    this.formSubmitEvent.emit(this.clothesForm.value);
  }

  cancel() {
    this.undoEvent.emit(this.clothesForm.value);
  }

}
