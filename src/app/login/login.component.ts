import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private rout:Router) { }

  ngOnInit(): void {
  }
    login(){
      // alert("login clicked")
      // this.acno=a.value
      // this.psw=b.value
      console.log(this.acno);
      console.log(this.psw);
      this.rout.navigateByUrl("home")
      
      
    }
    acnoChange(event:any){
      console.log(event.target.value);
    }
    passChange(event:any){
      console.log(event.target.value);
    }

  }


