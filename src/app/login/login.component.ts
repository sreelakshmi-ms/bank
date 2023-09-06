import { Component } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data="happy banking"
  data2="Enter account no."

  constructor() { }

  ngOnInit(): void {
  }
    login(){
      alert("login clicked")
    }
    acnoChange(event:any){
      console.log(event.target.value);
    }
    passChange(event:any){
      console.log(event.target.value);
    }

  }


