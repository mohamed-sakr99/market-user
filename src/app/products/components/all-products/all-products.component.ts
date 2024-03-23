import { Component } from '@angular/core';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent {
  products: any[] = [];
  categories: any[] = [];
  isLoading: boolean = false;
  cartProducts: any[] = [];
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.products = res;
        console.log(this.products);
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  getCategories() {
    this.isLoading = true;
    this.productsService.getAllCategories().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.categories = res;
        console.log(res);
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  filterCategories(event: any) {
    let value = event.target.value;
    if (value == 'all') {
      this.getProducts();
    } else {
      this.getProductByCategory(value);
    }
  }

  getProductByCategory(keyword: string) {
    this.isLoading = true;
    this.productsService.filterCategory(keyword).subscribe((res: any) => {
      this.isLoading = false;
      this.products = res;
    });
  }
  addToCart(event: any) {
    console.log(event);
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item) => item.item.id == event.item.id);
      if (exist) {
        alert('product is already added');
      } else {
         this.cartProducts.push(event);
         localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
