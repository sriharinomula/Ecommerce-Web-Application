import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   category:string="";
   search:string="";
   product:any=[];
   isFeedbackOpen:boolean=false;
   formData:any={};
   token:any={};
   role:any={};
   feedexists:any={};
   isAdmin:boolean=false;

  constructor(private productsService:ProductsService,private router: Router) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    console.log(this.token);
    
    this.role=localStorage.getItem('role');
    if(this.role==='admin'){
      this.isAdmin=true;
    }
    if(!this.token){
       this.router.navigate(['']);
    }
    
  }
  feedback(){
    this.productsService.feedFormOpen().subscribe(data=>{
       this.feedexists=data;
       console.log(this.feedexists);
       if(this.feedexists['data']==='feedback not exists'){
         this.router.navigate(['/feedback']);
        
       }
       else{
         alert('feedback exists');
       }
       
    })
    
    
  }
  
  /*userFeed(){
    console.log(this.formData);
    this.productsService.review({data:this.formData}).subscribe(data=>{
      console.log(data);
      
    })
    this.isFeedbackOpen=!this.isFeedbackOpen;
    
  }
  closeFeed(){
    this.isFeedbackOpen=!this.isFeedbackOpen;
  }*/

  goHome(){
    console.log('home');
    
    this.router.navigate(['/home']); 
  }
  profile(){
    console.log('profile');
    this.router.navigate(['/profile']);
    
  }
  
  
  admin(){
    console.log('admin');
    this.role=localStorage.getItem('role');
    console.log(this.role);
    if(this.role==='admin'){
    this.router.navigate(['/admin']);
    }
    else{
      alert("users don't have acess")
    }
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('logged out')
    this.router.navigate(['/']);
  }
  /*getProduct() {
    
    this.productsService.filterProducts( { category: this.category, search: this.search }).subscribe(data => {
    this.product.push(data);
    //console.log(data);
    console.log(this.product);
    
    });
    
    
    
  }*/

}
