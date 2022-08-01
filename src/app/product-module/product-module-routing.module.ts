import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddProductComponent} from "./add-product/add-product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CategoryComponent} from "./category/category.component";
import {PropertyComponent} from "./property/property.component";
import {ListProductsComponent} from "./list-products/list-products.component";
import {FournisseurComponent} from "./fournisseur/fournisseur.component";
import {AddFournisseurComponent} from "./add-fournisseur/add-fournisseur.component";
import {UpdateFrsComponent} from "./update-frs/update-frs.component";

const routes: Routes = [
  {path: '', component: ListProductsComponent },
  {path: 'Ajouter', component: AddProductComponent },
  {path: 'details', component: ProductDetailsComponent},
  {path: 'Catégorie', component: CategoryComponent},
  {path: 'Propriété', component: PropertyComponent},
  {path: 'fournisseur', component: FournisseurComponent},
  {path: 'Ajouter_fournisseur', component: AddFournisseurComponent},
  {path: 'update_fournisseur', component: UpdateFrsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductModuleRoutingModule { }
