import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product.model";
import { Subscription } from 'rxjs';
import {waitForAsync} from "@angular/core/testing";
import {CategoryService} from "../category.service";
import {Category} from "../category.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

   constructor(private productService: ProductService, private categoryService : CategoryService) {

  }
  subscription!: Subscription;

  productDetails!: Product;
  categorie!: Category;
  ngOnInit(): void {
   let c =  this.productService.getID().subscribe(data=>{
     this.productService.getproductById( data.toString() ).subscribe({
       next: (res)=>{
         this.productDetails = res;
         this.categoryService.getCategoryByid(res.categoryID).subscribe(
           {
             next: (res)=>{
               this.productDetails.category = res
             }
           }
         )
       }
     })
    })


  }

  items = [
    {title: 'List des Products', url: "/"},
    {title: 'Ajouter produit', url: "/"},
    {title: 'Ajouter categorie'},
    {title: 'Ajouter Variant'},
  ];

}
