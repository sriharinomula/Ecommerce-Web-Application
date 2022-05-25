import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
   /*title:any="";
   desc:any="";
   price:any="";
   category:any="";*/
   images:any=[];
   formData:any={};
   message:any="";
   token:any="";
  constructor(private productsService:ProductsService,private router: Router) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    console.log(this.token);
    if(!this.token){
       this.router.navigate(['']);
    }
  }
  
  
  newProd(){
    //this.images.push(this.images);
    console.log(this.formData);
    this.images.push(this.formData["images"]);
    console.log(this.images);
    this.formData["images"]=this.images;
    console.log(this.formData);
    
    this.productsService.addProd({data:this.formData}).subscribe(data=>{console.log(data);
      alert('sucessfully new product is added');
     this.message=data;
     this.router.navigate(['/home']);
    })
    
    
    
    //this.productsService.addProd({title:this.title,description:this.desc,price:this.price,category:this.category,images:})
  }
  close(){
    this.router.navigate(['/home']);
  }
}
