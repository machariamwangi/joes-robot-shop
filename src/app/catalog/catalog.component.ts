
import { Component, inject } from '@angular/core';
import { IProduct } from './product.module';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
   products: any;
   filter: string = '';
   //private  cartSvc : CartService = inject(CartService); //@Injectable() and Hierarchical DI
  constructor(
    private  cartSvc : CartService,
    private productSvc : ProductService,
    private router: Router,
    private route: ActivatedRoute
  ){ }

  ngOnInit(){
    this.productSvc.getProducts().subscribe((products) => {
      this.products = products;
    });

   this.route.queryParams.subscribe((params) => {
    this.filter =  params['filter'] ?? '';
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
    this.router.navigate(['/cart'])
  }

}
