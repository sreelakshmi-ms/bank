import { Component, OnInit } from '@angular/core';
import { DataService } from '../bankService/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: any = ""
  acno: any = ""
  balance: any = ""
  message: any = ""
  msgClr: any = true
  dAcno: any = ""


  // reactive form for money transfer
  moneyTransferForm = this.fb.group({
    rAcno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private rout: Router, private ds: DataService, private fb: FormBuilder, private dp: DatePipe) { }

  ngOnInit(): void {
    // check whether data is present or not in local storage
    if (localStorage.getItem("currentUname")) {
      this.name = localStorage.getItem("currentUname")
      // console.log(this.name);
    }

    // login or not
    if (!localStorage.getItem("currentAcno")) {
      this.rout.navigateByUrl("")
      alert("Please login first")
    }


  }


  getbalance() {
    // acno- local storage
    if (localStorage.getItem("currentAcno")) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")

      // balance
      this.ds.getBalanceApi(this.acno).subscribe({
        next: (result: any) => {
          this.balance = result.message
        },
        error: (result: any) => {
          alert(result.error.message)
        }
      })

    }
  }
  getProfile() {
    if (localStorage.getItem("currentAcno")) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
    }
  }
  moneyTransfer() {
    if (this.moneyTransferForm.valid) {
      var path = this.moneyTransferForm.value
      var rAcno = path.rAcno
      var amount = path.amount
      var psw = path.psw
      // sender acno
      if (localStorage.getItem("currentAcno")) {
        this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
      }

      // date
      const date = new Date()
      var latestDate = this.dp.transform(date, 'medium');

      if (this.acno == rAcno) {
        this.message = "Sender and receiver account number are same"
        this.msgClr = false
        // alert("sender and receiver account number are same")
      }
      else {
        this.ds.moneyTransferApi(this.acno, rAcno, amount, psw, latestDate).subscribe({
          next: (result: any) => {
            // alert(result.message)
            this.message = result.message
            this.msgClr = true

          },
          error: (result: any) => {
            // alert(result.error.message)
            this.message = result.error.message
            this.msgClr = false
          }
        })
      }

    }
    else {
      this.message = "Invalid form"
      this.msgClr = false
    }
  }
  logout() {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    this.rout.navigateByUrl("")
  }

  deleteActive() {
    if (localStorage.getItem("currentAcno")) {
      this.dAcno = JSON.parse(localStorage.getItem("currentAcno") || "")
      console.log(this.dAcno);

    }
  }

  cancelp() {
    this.dAcno = ""
  }

  yesDelete(event: any) {
    // console.log(event);
    this.ds.accountDeleteApi(event).subscribe({
      next: (data: any) => {
        alert(data.message)
        this.logout()
      }
    })

  }

}



