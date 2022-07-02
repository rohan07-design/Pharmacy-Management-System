import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AllListingComponent } from './all-listing/all-listing.component';
import { CartComponent } from './cart/cart.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ManageListingComponent } from './manage-listing/manage-listing.component';

const routes: Routes = [
  {
    path:"",
    component:AllListingComponent
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path:":id",
    component:ListingDetailComponent
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingRoutingModule { }
