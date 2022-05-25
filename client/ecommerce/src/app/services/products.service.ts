import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../product';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _url:string='http://localhost:5000';
  constructor(private http:HttpClient) { }
  filterProducts(data:any){
    console.log(data);
    
     return this.http.get(this._url+'/products'+`/${data.category}`+`/${data.search}`);
  }
  removeProd(data:any){
    console.log(data);
    return this.http.delete(this._url+'/products'+'/item'+`/${data.title}`);
    
  }
  addProd(data:any){
    console.log(data);
    return this.http.post(this._url+'/products'+'/item'+'/new',data);
    
  }
  newRegister(data:any){
   console.log(data);
   return this.http.post('http://localhost:5000/newuser/register',data);
   
  }
  signin(data:any){
    console.log(data);
    return this.http.post('http://localhost:5000/user/login',data);
    
  }
  getRoute(){
    return this.http.get(this._url+'/products'+'/role');
  }

  userDetails(){
    return this.http.get(this._url+'/profile'+'/user');
  }
  review(data:any){
    return this.http.post(this._url+'/customers'+'/feedback',data);
  }
  feedFormOpen(){
    return this.http.get(this._url+'/customers'+'/exists');
  }
  usersFeedback(){
    return this.http.get(this._url+'/admin'+'/results');
  }
  sortFeedback(){
    return this.http.get(this._url+'/admin'+'/sort');
  }
  filterFeedback(){
    return this.http.get(this._url+'/admin'+'/filter');
  }
  randomProd(){
    return this.http.get(this._url+'/products'+'/random')
  }
  cart(data:any){
    return this.http.put(this._url+'/products'+'/cart',data);
  }
  searchFeed(data:any){
    return this.http.post(this._url+'/admin'+'/search',data);
  }
  
}
