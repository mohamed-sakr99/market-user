import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseApi = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) { }

  AddToCart(model:any) {
    return this.http.post(this.baseApi + 'carts', model);
  }
}
