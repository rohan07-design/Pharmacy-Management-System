
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Listing } from '../model/listing';
import { CheckoutService } from '../service/checkout.service';
import { ListingService } from '../service/listing.service';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {

  //fetching single item
  id:string;
  listing:Listing;
  listingsub$:Subscription; 

  //payment
  paymentHandler:any = null;
  success: boolean = false
  failure:boolean = false
  

  constructor(private listingService:ListingService,
    private route:ActivatedRoute,
    private checkout:CheckoutService) { }

  ngOnInit(): void {
    //fetching single id
    this.id =  this.route.snapshot.paramMap.get("id")!;
    this.listingsub$ = this.listingService.getListing(this.id).subscribe(listing => {
      this.listing = listing;
    })

    //payment
    this.invokeStripe()
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LE33ASIT3dowHOXp9V2NtwQzuhbhHXmnS7HvmQomaJGqc9oBTpnaDQkQSAlm5MKVzgAwm9rYSsD2Qo5jvg2f24g00RuDVrPbC',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this.checkout.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.success = true
        }
      });
    };

    paymentHandler.open({
      name: 'Pharma.com',
      description: 'This is a sample pdf file',
      amount: 1000/amount,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LE33ASIT3dowHOXp9V2NtwQzuhbhHXmnS7HvmQomaJGqc9oBTpnaDQkQSAlm5MKVzgAwm9rYSsD2Qo5jvg2f24g00RuDVrPbC',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }

}
