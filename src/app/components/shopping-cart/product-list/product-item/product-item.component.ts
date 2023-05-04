import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product'
import { MessengerService } from 'src/app/services/messenger.service'
import { CartService } from 'src/app/services/cart.service'
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: any;

  @Input() addedToWishlist: boolean;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private productService: ProductService
  ) { }


  preferences:any;

  ngOnInit() {
  debugger  
    this.preferences =  this.productItem.product.preferences.split('###');


  }

  handleAddToCart() {
    this.cartService.addProductToCart(this.productItem).subscribe(() => {
      this.msg.sendMsg(this.productItem)
    })
  }

  // handleAddToWishlist() {
  //   this.wishlistService.addToWishlist(this.productItem.id).subscribe(() => {
  //     this.addedToWishlist = true;
  //   })
  // }

  handleRemoveProductItem() {
    this.productService.removeProduct(this.productItem.id).subscribe(() => {
    })

    window.location.reload();
  }

}
