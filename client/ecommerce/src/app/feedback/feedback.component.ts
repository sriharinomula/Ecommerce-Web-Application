import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  formData:any={};
  constructor(private productsService:ProductsService,private router: Router) { }

  ngOnInit(): void {
  }
  userFeed(){
    console.log(this.formData);
    this.productsService.review({data:this.formData}).subscribe(data=>{
      console.log(data);
      alert('ThankYou For Your Feedback')
      this.router.navigate(['/home']);
      
    })
  }
  closeFeed(){
    this.router.navigate(['/home']);
  }

}
