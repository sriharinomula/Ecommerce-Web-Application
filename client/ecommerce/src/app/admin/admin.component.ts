import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  token:any={};
  role:any={};
  backdata:any={};
  sortdata:any={};
  filterdata:any={};
  formData:any={};
  searchdata:any={};
  reviews:any=[];
  isSortOpen:boolean=false;
  constructor(private ProductsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.role=localStorage.getItem('role');
    console.log(this.token);
    console.log('*******');
    console.log(this.role);
    
    
    if(!this.token ){
      
        console.log('role');
      
       this.router.navigate(['']);
      
        console.log('token');
      
       
    }
    else{
      this.ProductsService.usersFeedback().subscribe(data=>{console.log(data);
        this.backdata=data
        console.log(this.backdata);
        this.isSortOpen=!this.isSortOpen;
        this.reviews.push(this.backdata['data']);
        console.log('*****');
        console.log(this.reviews['0']);
        
      })
    }
  }
  sort(){
    console.log('sort');
    this.ProductsService.sortFeedback().subscribe(data=>{console.log(data);
     this.sortdata=data;
     console.log(this.sortdata);
     this.reviews=[];
     this.reviews.push(this.sortdata['data']);
     
    })
    
  }
filter(){
  console.log('filter');
  this.ProductsService.filterFeedback().subscribe(data=>{console.log(data);
  this.filterdata=data;
  console.log(this.filterdata);
  this.reviews=[];
  this.reviews.push(this.filterdata['data']);
  
  })
  
}
routeNew(){
  this.ProductsService.getRoute().subscribe(data=>{console.log(data);
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
}
searching(){
  console.log(this.formData.search);
  this.ProductsService.searchFeed({search:this.formData.search}).subscribe(data=>{console.log(data);
    this.searchdata=data;
    this.reviews=[];
     this.reviews.push(this.searchdata['data']);
  })
  
}

}
