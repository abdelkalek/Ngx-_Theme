import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Product} from "./product.model";
import {Category} from "./category.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {Property} from "./property.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private endpoint = environment.endPointprod;

  constructor(private http: HttpClient) {
  }

  getAllCategory() {

    return this.http.get<Category[]>(this.endpoint + '/Category')

  }

  addCtegory(category: any) {
    return this.http.post(this.endpoint + '/Category', category);
  }

  getCategoryByid(id: string) {
    return this.http.get<Category>(this.endpoint + '/Category/' + id);
  }

  deleteCategory(id: string) {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'});
    return this.http.delete(this.endpoint + '/Category/DeleteCategory/' + id, {headers: headers});
  }

  BindtoProperty(categorytId: string, propertyId: string): Observable<Property[]>{
    return this.http.post<Property[]>(this.endpoint + '/Category/BindtoProperty/',
      {
        categorytId: categorytId,
        propertyId: propertyId
      }).pipe(catchError(this.handelError));;

  }

  private handelError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Une erreur se produit';
    /*if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }*/
    switch (errorRes.error) {
      case 'ProductManagment.Core.Entities.CategoryCategory exist in this property':
        errorMessage = 'propriété existe dans cette catégorie';
        break;

      case 'Proprety is not exist':
        errorMessage = 'propriété n\'existe pas';
        break;
    }
    return throwError(() => errorMessage);  }
}
