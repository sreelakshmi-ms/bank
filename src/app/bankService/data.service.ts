import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// overloading header method
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  baseUrl: any = "https://bank-server-b566.onrender.com"

  constructor(private http: HttpClient) { }

  getToken() {

    // create a header object
    const headers = new HttpHeaders()

    if(localStorage.getItem("token")){
      const token=JSON.parse(localStorage.getItem("token") || "")
      options.headers=headers.append("access_token", token)
    }

    return options
  }

  // api to create account
  accountCreate(acno: any, psw: any, uname: any) {
    const bodyData = { acno, psw, uname }
    return this.http.post(`${this.baseUrl}/bankuser/create_acc`, bodyData)

  }

  // api to login
  userLogin(acno: any, psw: any) {
    const loginData = { acno, psw }
    return this.http.post(`${this.baseUrl}/bankuser/login`, loginData)

  }

  // api to get balance
  getBalanceApi(acno: any) {
    return this.http.get(`${this.baseUrl}/bankuser/balance/${acno}`,this.getToken())
  }

  // api to money transfer
  moneyTransferApi(sAcno: any, rAcno: any, amount: any, psw: any, date: any) {
    const bodyData = { sAcno, rAcno, amount, psw, date }
    return this.http.post(`${this.baseUrl}/bankuser/money_transfer`, bodyData,this.getToken())
  }

  // api to get transaction history
  accountStatementApi(acno: any) {
    return this.http.get(`${this.baseUrl}/bankuser/account_statement/${acno}`,this.getToken())
  }


  // api to delete account
  accountDeleteApi(acno: any) {
    return this.http.delete(`${this.baseUrl}/bankuser/delete-account/${acno}`,this.getToken())
  }

}


