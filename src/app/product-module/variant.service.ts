import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VariantService {
  private endpoint = environment.endPointprod;


  constructor(private http: HttpClient) {
  }
AddNewVariant(prodVari : any){
  console.log("variant Adedd")
return this.http.post(this.endpoint+'/Variant/AddVariantPropertiesValues', {

    nom:"Ver",
    description:"Description",
    variantPropertiesList:prodVari.properties,
    newprod: {
    ref: prodVari.ref,
      nom: prodVari.nom,
      description: prodVari.description,
      urlImage: prodVari.urlImage,
      cout: prodVari.cout,
      poids: prodVari.poids,
      volume: prodVari.volume,
      lastPrix: prodVari.lastPrix,
      typeProd: prodVari.typeProd,
      model: prodVari.model,
      sku: prodVari.sku,
      barcode: prodVari.barcode,
      categoryId: prodVari.categoryId
  }


});
}

}
