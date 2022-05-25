import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  info:any={};
  token:any={};
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    console.log(this.token);
    if(!this.token){
       this.router.navigate(['']);
    }
    else{
      this.productsService.userDetails().subscribe(data=>{console.log(data);
        this.info=data;
        console.log(this.info['data']);
        
      })
    }
  }

 /* myProfile(){
    this.productsService.userDetails().subscribe(data=>{console.log(data);
      this.info=data;
      console.log(this.info['data']);
      
    })
  }*/

}
