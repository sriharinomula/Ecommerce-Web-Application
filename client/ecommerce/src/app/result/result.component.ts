import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  product:any=[];
  title:string="";
  response:any="";
  role:any="";
  isUpdateFormOpen:boolean=false;
  formData:any={};
  cart:any=[];
  cartres:any={};
  message:any="";
  token:any={};
  isAdmin:boolean=false;
  constructor(private productsService:ProductsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    console.log(this.token);
    this.role=localStorage.getItem('role');
    console.log(this.role);
    if(this.role==='admin'){
      this.isAdmin=true;
    }
    if(!this.token){
       this.router.navigate(['']);
    }
   else{
    this.route.queryParams.subscribe(params => {
      this.productsService.filterProducts({category:params['category'],search:params['search']}).subscribe(data=>{
        this.message=data
        console.log(this.message['data']);
        
        
        if(this.message['data']==='No results found'){
          alert("product doesn't exists")
          this.router.navigate(['/home'])
        }
        else{
          this.product.push(data);
        }
        console.log('hello');
        
        console.log(this.product);
        
      })
    });
  }
  }
  /*getProduct() {
    
    this.productsService.filterProducts( { category: this.category, search: this.search }).subscribe(data => {
    this.product.push(data);
    console.log(data);
    console.log(this.product);
    
    });*/
    updateProd(){
      this.isUpdateFormOpen=!this.isUpdateFormOpen;
      console.log(this.product['0']['title']);
      
       }
     update(){
       console.log(this.product);
       
     }  
     close(){
      this.isUpdateFormOpen=!this.isUpdateFormOpen;
     }
    deleteProd(){
      console.log('hi');
      
      console.log(this.product[0]['title']);
      
      this.productsService.removeProd({title:this.product[0]['title']}).subscribe(data=>{ console.log(data);
        this.message=data;
        alert(this.message['data']);
        /*if(this.message['data']==='not authorized'){
          alert('only admin can delete')
        }*/
       })
       this.router.navigate(['/home']);
    }
    /*routeNew(){
      this.productsService.getRoute().subscribe(data=>{console.log(data);
        this.role=data;
        console.log(this.role['role']);
        if(this.role['role']==='admin'){
          this.router.navigate(['/new'])
        }
        else{
           
           alert("users don't have authority");
        }
        
      }
      )
    }*/
    addCart(){
      console.log('cart');
      console.log(this.product[0]['title']);
      this.productsService.cart({title:this.product['0']['title']}).subscribe(data=>{console.log(data);
        this.cartres=data;
        
        alert(this.cartres['data']);
      })
      
      
    }
    
  }


