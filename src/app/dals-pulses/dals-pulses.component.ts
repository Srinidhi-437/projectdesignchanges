import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dals-pulses',
  templateUrl: './dals-pulses.component.html',
  styleUrls: ['./dals-pulses.component.css']
})
export class DalsPulsesComponent implements OnInit {
  products=[];
  dalsarray=[];
  constructor(private userservice:UserService,private router:Router,private toaster:ToastrService,private cartService:CartService) { }

  ngOnInit(): void {
    console.log("hii iam dals")
    this.userservice.getdals().subscribe(
      res=>{
         //  res["message"]
         this.dalsarray = res["message"]
         console.log("iam dalspulses",this.dalsarray)
       
      
      },
      err=>{
        console.log("error from dals pulses",err)
      }
 
    )
  


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
      alert(res["message"])
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


