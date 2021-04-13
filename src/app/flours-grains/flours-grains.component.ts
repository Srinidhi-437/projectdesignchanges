import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-flours-grains',
  templateUrl: './flours-grains.component.html',
  styleUrls: ['./flours-grains.component.css']
})
export class FloursGrainsComponent implements OnInit {
  floursgrainsarray=[];
  constructor(private userservice:UserService,private router:Router,private cartService:CartService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.userservice.getfloursgrains().subscribe(
      res=>{
         //  res["message"]
         this.floursgrainsarray = res["message"]
        //  console.log("iam flours-grains",this.floursgrainsarray)
       
      
      },
      err=>{
        console.log("error from flours-grains",err)
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
