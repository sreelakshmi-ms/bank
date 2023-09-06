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
  acno:string=""
  psw:string=""

  constructor() { }

  ngOnInit(): void {
  }
    login(a:any,b:any){
      // alert("login clicked")
      this.acno=a.value
      this.psw=b.value
      console.log(this.acno);
      console.log(this.psw);
      
      
    }
    acnoChange(event:any){
      console.log(event.target.value);
    }
    passChange(event:any){
      console.log(event.target.value);
    }

  }


