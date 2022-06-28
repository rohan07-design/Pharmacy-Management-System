import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Listing } from '../model/listing';
import { CartapiService } from '../service/cartapi.service';
import { ListingService } from '../service/listing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-listing',
  templateUrl: './all-listing.component.html',
  styleUrls: ['./all-listing.component.css']
})
export class AllListingComponent implements OnInit {

  productList:any;
  listings$: Observable<Listing[]>;
  count = 1;
  searchText = "";  //for searching
  constructor(private listingService:ListingService,
    private cartApi:CartapiService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.listings$ = this.listingService.getListings();
    this.listingService.getListings().subscribe(res => {
      this.productList = res;
      
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:this.count, total:a.price})
      }); 
    })
  }


  incre(data:any) {
    this.count = this.count+1
    this.productList.quantity = this.count;
  }

  decre(data:any) {
    if(this.count == 0) {
      alert("The quantity cannot be zero");
    } else {
      this.count = this.count-1
    }
  }

  itemsCart = new Array();

  addToCart(item:any) {
    // console.log(item)
    // console.log(typeof(item))
    // this.itemsCart.push(item)
    // console.log(this.itemsCart)
    let cartData = localStorage.getItem('localcart');
    if(cartData == null) {
      let storeData:any = [];
      storeData.push(item)
      localStorage.setItem('localcart',JSON.stringify(storeData));
    } else {
      var id = item._id;
      let index:number = -1; //false condition
      this.itemsCart = JSON.parse(localStorage.getItem('localcart')!);
      // console.log(this.itemsCart.length)
      for(let i=0; i<this.itemsCart.length; i++) {
        if(parseInt(id) == parseInt(this.itemsCart[i]._id)) {
          // this.itemsCart[i].quantity = item.quantity;
          // console.log(i)
          index = i;
          break;
        }
      }
      this.itemsCart.push(item)
      // console.log(this.itemsCart)
      if(index == -1) {
        this.itemsCart.push(item);
        localStorage.setItem('localcart',JSON.stringify(this.itemsCart))
      }
      else {
        localStorage.setItem('localcart',JSON.stringify(this.itemsCart))
      }
    }
    this.cartApi.addToCart(item);
  }

  onSearchTextEntered(text:any) {
    this.searchText = text;
  }

}
