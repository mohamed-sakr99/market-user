import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseApi: string = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.baseApi + 'products');
  }

  getAllCategories() {
    return this.http.get(this.baseApi + 'products/categories');
  }
  filterCategory(keyword:string) {
    return this.http.get(this.baseApi + 'products/category/' +keyword);
  }

  getSingleProduct(id:any) {
    return this.http.get(this.baseApi + 'products/' + id);
  }
}
