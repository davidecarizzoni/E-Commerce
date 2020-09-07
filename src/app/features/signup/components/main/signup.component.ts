import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { User } from 'src/app/core/model/user.interface';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  user: User = {
    username: null,
    name: null,
    surname: null,
    password: null
  }

  constructor(fb: FormBuilder, private registrationService: SignupService, private router: Router) {
    this.signUpForm = fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {}
  
  doSignUp(){

    console.log("Signup button clicked")

    this.user.username = this.signUpForm.get('username').value;
    this.user.name = this.signUpForm.get('name').value;
    this.user.surname = this.signUpForm.get('surname').value;
    this.user.password = this.signUpForm.get('password').value;
    console.log(this.user);

    this.registrationService.insertUser(this.user);
  }

  

}
