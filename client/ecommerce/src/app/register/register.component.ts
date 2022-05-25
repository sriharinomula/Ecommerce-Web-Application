import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formData:any={};
  response:any={};
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }
  register():void{
  console.log(this.formData);
  this.productsService.newRegister({data:this.formData}).subscribe(data=>{console.log(data);
    this.response=data
    console.log(this.response["data"]);
    if(this.response["data"]!=="user exists"){
      alert('registration sucessful')
      this.router.navigate(['']); 
    }
    else{
      alert('details exists')
    }
    
  })
  
  }
  login(){
    this.router.navigate(['']); 
  }

}
