import {Category} from "./category.model";

export interface Product {
   id : string ,
   nom: string,
   description: string,
   urlImage:  string,
   lastPrix : string,
   typeProd : string,
   categoryID : string,
   ref: string ,
  cout: string ,
  poids:string ,
  volume:string ,
  model: string,
  sku: string,
  barcode: string,
  category : Category,
}
