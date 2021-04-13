import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';
import {SearchPipe} from '../search.pipe';
@Component({
  selector: 'app-homecards',
  templateUrl: './homecards.component.html',
  styleUrls: ['./homecards.component.css']
})
export class HomecardsComponent implements OnInit {
  products=[];
   searchTerm:string;
   searchobj=[];
  // dataArray=[];
  constructor(private adminservice:AdminService,
              private toaster:ToastrService,
              private router:Router,
              private cartService:CartService,
              private userservice:UserService) { }

  ngOnInit(): void {
  

      this.adminservice.getproduct().subscribe(
        res=>{
          this.products=res["message"];
          return this.products;
        },
        err=>{
          console.log(err)
        }
      )

// search pipe code
      // this.userservice.getdatafromoutside().subscribe(
      //   res=>{
      //     this.dataArray=res;
      //   },
      //   err=>{
      //     alert("something went wrong")
      //     console.log(err)
      //   }
      // )

  }

  
  gotoViewProduct(productid){
this.router.navigateByUrl(`/viewproduct/${productid}`)
  }


  addToCart(product){
    // alert();
    // this.toaster.error("Please login to Proceed With your order")
    // this.router.navigateByUrl("/login")
 let username=localStorage.getItem("username");
 if(username==undefined){
  this.toaster.error("Please login to Proceed With your order")
  this.router.navigateByUrl("/login")

}
else{
  let selectedProduct={};
  selectedProduct["username"]=username;
  selectedProduct["product"]=product;

  console.log(selectedProduct)
  this.cartService.addToCart(selectedProduct).subscribe(
    res=>{
      // alert(res["message"])
      this.toaster.success(res["message"])

      // this.userservice.setCartSize(res["cartsize"])
       //inform about cartsize to user service
       this.userservice.setCartSubjectSize(res["cartsize"])

      this.router.navigateByUrl(`/userdashboard/${username}`)
    },
    err=>{
      alert("Error occurred")
      console.log(err)
    }
  )
  }


  }
  

}
