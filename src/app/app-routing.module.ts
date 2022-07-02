import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminProductsComponent } from './listing/admin-products/admin-products.component';
import { CartComponent } from './listing/cart/cart.component';
import { ManageListingComponent } from './listing/manage-listing/manage-listing.component';

const routes: Routes = [
  {
    path:"", redirectTo:"home",pathMatch:"full"
  },
  {
    path:"listings", 
    loadChildren:()=> import("./listing/listing.module").then(m => m.ListingModule)
  },
  {
    path:"user",
    loadChildren:()=> import("./user/user.module").then(m=> m.UserModule)
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"adminProducts",
    component:AdminProductsComponent
  },
  {
    path:"adminProducts/:id",
    component:ManageListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
