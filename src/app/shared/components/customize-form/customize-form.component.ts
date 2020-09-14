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
    if(this.clothes != null){
      this.clothesForm = this.fb.group({
        id:this.clothes.id,
        name: [this.clothes.name, Validators.required],
        color: [this.clothes.color, Validators.required],
        text: [this.clothes.text, Validators.required],
        textColor: [this.clothes.textColor, Validators.required],
      });
    }
  }
  
 constructor(private fb: FormBuilder) {
    this.clothesForm = this.fb.group({
      id:'',
      name: ['',Validators.required],
      color: ['',Validators.required],
      text: ['',Validators.required],
      textColor: ['',Validators.required],
    });
  }

  confirmChanges() {
    this.formSubmitEvent.emit(this.clothesForm.value);
  }

  cancel() {
    this.undoEvent.emit(this.clothesForm.value);
  }

}
