import { ProductsService } from './../../service/products.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent {
  id: any;
  data: any;
  loading:boolean = false;
  constructor(
    private activtedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.id = this.activtedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getProductId();
  }

  getProductId() {
    this.loading = true;
    this.productsService.getSingleProduct(this.id).subscribe((res: any) => {
      this.loading = false;
      this.data = res;
    }, error => {
      this.loading = false;
      alert(error)
    });
  }
}
