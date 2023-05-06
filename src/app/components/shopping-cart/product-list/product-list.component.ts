import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service'
import { Product } from 'src/app/models/product';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = []
  wishlist: number[] = []

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private msgService: MessengerService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCartItems();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    })
  }

  loadCartItems()
  {
  this.cartService.getCartItems().subscribe(result => {
      
      this.msgService.sendMsg(result.length)
    
    })
  }

}
