import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData:any={};
  response:any={};
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    console.log(this.formData);
    this.productsService.signin({data:this.formData}).subscribe(data=>{
      console.log(data);
    this.response=data
    this.response['role']=this.formData['role'];
    console.log(this.response["message"]);
    if(this.response["message"]==="Valid password"){
      localStorage.setItem('token',this.response["token"]);
      localStorage.setItem('role',this.response["role"]);
      this.router.navigate(['/home']); 
      alert('logged in')
    }
    else{
      alert('enter valid details');
    }
    })
    
  }
  register(){
    this.router.navigate(['/register']); 
  }

}
