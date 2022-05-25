import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public product:any=[];
  items:any={};
  token:any={};
  length:any;
  
  constructor(private ProductsService:ProductsService,private router:Router) { }

  ngOnInit() {
    //this._ProductsService.getProduct().subscribe(data=> this.product=data);
    this.token=localStorage.getItem('token');
    console.log(this.token);
    if(!this.token){
       this.router.navigate(['']);
    }
    else{
      this.ProductsService.randomProd().subscribe(data=>{console.log(data);
        this.items=data;
        console.log(this.items['data']);
        this.product.push(this.items['data'])
        this.length=this.product.length;
        console.log(this.length);
        
        
      })
    }
    

  }
  sendProd(){

  }
 

}
