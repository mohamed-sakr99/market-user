import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartProducts: any[] = [];
  total: any = 0;
  success: boolean = false;
  constructor(private cartService:CartService) {}
  ngOnInit(): void {
    this.viewCartDetials();
  }

  viewCartDetials() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      console.log('addToCart', this.cartProducts);
    }
    this.getCartTotal();
  }

  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addAmout(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    //update local storage with new value
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  minusAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    //update local storage with new value
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  detectChange(e: any) {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  Delete(index: number) {
    this.cartProducts.splice(index, 1);
    this.getCartTotal();
    //update local storage with new value
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  clearShoppingCart() {
    this.cartProducts = [];
    //update local storage with new value
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  sendCartToBackend() {
    let products = this.cartProducts.map((item) => {
      return {
        productId: item.item.id,
        quantity: item.quantity,
      };
    });
    let model = {
      userId: 5,
      date: new Date(),
      products: products,
    };
    console.log(model);
    this.cartService.AddToCart(model).subscribe((res: any) => {
      this.success = true;
    })
  }
}
