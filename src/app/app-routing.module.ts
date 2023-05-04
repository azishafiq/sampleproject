import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component'
import { CartComponent } from './components/shopping-cart/cart/cart.component'
import { ProductAddComponent } from './components/shopping-cart/product-add/product-add.component'
import { ProductEditComponent } from './components/shopping-cart/product-edit/product-edit.component'

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ShoppingCartComponent },
  { path: "product-add", component: ProductAddComponent},
  { path: "product-edit", component: ProductEditComponent},
  { path: "cart", component: CartComponent},
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
