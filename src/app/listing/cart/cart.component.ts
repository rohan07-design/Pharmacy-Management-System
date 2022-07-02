import { Component, OnInit } from '@angular/core';
import { CartapiService } from '../service/cartapi.service';
import { CheckoutService } from '../service/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  quanty = 1;
  products: any = [];
  allProducts: any = 0;
  paymentHandler:any = null;
  success: boolean = false
  failure:boolean = false
  constructor(private cartApi: CartapiService,
    private checkout:CheckoutService) { }

  ngOnInit(): void {
    this.cartDetails()
    // this.cartApi.getProductData().subscribe(res => {
    //   this.products = res;
    //   console.log(this.products)
    //   this.products.forEach((a:any) => {
    //     Object.assign(a,{quantity:1, total:a.price*a.quantity})
    //   });
    //   console.log(this.products);
    //   this.allProducts = this.cartApi.getTotalAmount();
    // }) 
    this.invokeStripe()
  }

  removeProduct(item: any) {
    this.cartApi.removeCartData(item);
  }

  removeAllProduct() {
    this.cartApi.removeAllCart();
  }

  incre(data: any) {
    data.quantity = data.quantity + 1
  }

  decre(data: any) {
    if (data.quantity == 0) {
      alert("The quantity cannot be zero");
    } else {
      data.quantity = data.quantity - 1
    }
  }

  getCartDetails: any = [];
  cartDetails() {
    if (localStorage.getItem('localcart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localcart')!);
      console.log("the cart details")
      console.log(this.getCartDetails);
    }
  }
  removeall() {
    localStorage.removeItem('localcart');
    this.getCartDetails = [];
  }

  singledelete(getSingleItem:any) {
    if(localStorage.getItem('localcart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localcart')!);
      for(let i=0;i<this.getCartDetails.length;i++) {
        if(this.getCartDetails[i].id === getSingleItem) {
          this.getCartDetails.splice(i,1);
          localStorage.setItem('localcart',JSON.stringify(this.getCartDetails));
        }
      }
    }
  }
  

  //payment gateway
  // buttoncolor = "black";
  // buttonType = "buy";
  // iscustomSize = 250;
  // buttonHeight = 50;

  // paymentRequest = {
  //   apiVersion:2,
  //   apiVersionMinor:0,
  //   allowedPaymentMethod: [
  //     {
  //       type:"CARD",
  //       parameters:{
  //         allowedPaymentMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],
  //         allowedCardNetworks:["AMEX","VISA","MASTERCARD"]
  //       },
  //       tokenizationSpecification:{
  //         type:"PAYMENT_GATEWAY",
  //         parameters:{
  //           gateway:"example",
  //           gatewayMerchantI:"exampleGatewayMerchantId"
  //         }
  //       }
  //     }
  //   ],
  //   merchantInfo:{
  //     merchantId:"12345678901234567890",
  //     merchantName:"demo merchant"
  //   },
  //   transactionInfo:{
  //     totalPriceStatus:"FINAL",
  //     totalPriceLabel:"Total",
  //     totalPrice:"100.00",
  //     currencyCode:"USD",
  //     countryCode:"US"
  //   }
  // };
  // onLoadPaymentData(event:any) {
  //   console.log(event.detail)
  // }
  makePayment(amount: number) {
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
