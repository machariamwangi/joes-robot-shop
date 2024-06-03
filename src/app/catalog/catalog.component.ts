
import { Component, inject } from '@angular/core';
import { IProduct } from './product.module';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
   products: any;
   filter: string = '';
   //private  cartSvc : CartService = inject(CartService); //@Injectable() and Hierarchical DI
  constructor(private  cartSvc : CartService, private productSvc : ProductService){ }

  ngOnInit(){
    this.productSvc.getProducts().subscribe((products) => {
      this.products = products;
    })
  }
  getImageUrl(product: IProduct) {
    return '/assets/images/robot-parts/' + product.imageName;
  }

  getFilteredProducts() {
    return this.filter === ''? this.products: this.products.filter((x: any) =>x.category === this.filter)
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
  }

}
