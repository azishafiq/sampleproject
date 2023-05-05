import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { productsUrl } from 'src/app/config/api';

import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductById(productId)  {  
    return this.http.get(productsUrl + '/' + productId);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl);
  }

  addProduct(product: Product) {  
    return this.http.post(productsUrl , {product} );
  
  }
  
  editProduct(id, product: Product) {  
    return this.http.put(productsUrl + '/' + id , {product} );
  
  }

  removeProduct(productId) {  
    return this.http.delete(productsUrl + '/' + productId);
  }
}
