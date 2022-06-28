import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListingRoutingModule } from './listing-routing.module';
import { AllListingComponent } from './all-listing/all-listing.component';
import { CartComponent } from './cart/cart.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';


@NgModule({
  declarations: [
    AllListingComponent,
    CartComponent,
    ListingDetailComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    ListingRoutingModule,
    ReactiveFormsModule
  ]
})
export class ListingModule { }
