import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilporductComponent} from "./accueilporduct/accueilporduct.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CategoryComponent} from "./category/category.component";
import {PropertyComponent} from "./property/property.component";
import {ListProductsComponent} from "./list-products/list-products.component";

const routes: Routes = [
  {path: '', component: AccueilporductComponent },
  {path: 'add', component: AddProductComponent },
  {path: 'list', component: ListProductsComponent },
  {path: 'details', component: ProductDetailsComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'property', component: PropertyComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductModuleRoutingModule { }
