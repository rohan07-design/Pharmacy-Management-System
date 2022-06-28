import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Listing } from '../model/listing';
import { ListingService } from '../service/listing.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  productList:any;
  listings$: Observable<Listing[]>;
  listing:any;
  listingsub$:Subscription;
  id:any = ""

  //for adding the medicines
  listingForm = new FormGroup({
    image:new FormControl("",[Validators.required]),
    title:new FormControl("",[Validators.required]),
    price:new FormControl("",[Validators.required]),
    details:new FormControl("",[Validators.required]),
  });

  //for updating the medicines
  editListingForm = new FormGroup({
    image:new FormControl("",[Validators.required]),
    title:new FormControl("",[Validators.required]),
    price:new FormControl("",[Validators.required]),
    details:new FormControl("",[Validators.required])
  })

  constructor(private listingService:ListingService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    // this.listings$ = this.listingService.getListings();
    this.listingsub$ = this.listingService.getListing(this.id).subscribe(listing => {
      this.listing = listing;
    });
    this.listingService.getListings().subscribe(res => {
      this.productList = res;
  });
  }

  //for adding medicines
  newListing() {
    if(this.listingForm.valid) {
      this.listingService.addListing(this.listingForm.value).subscribe(res => {
        this.listingForm.reset();
        this.router.navigate(["/adminProducts"]);
      })
    }
  }

  //for updating the medicines
  editListing() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id)
    if(this.editListingForm.valid) {
      this.listingService.editListings(this.editListingForm.value,this.id).subscribe(res => {
        this.editListingForm.reset();
        this.router.navigate(["/adminProducts"]);
      })
    }
  }
}
