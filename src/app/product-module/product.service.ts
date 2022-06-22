import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "./product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint = environment.endPointprod;

  constructor(private http: HttpClient) {
  }
//Get Id from list
  private subjectId = new BehaviorSubject<string>("Null");
  sendId(Id: string) {
    this.subjectId.next(Id);
  }
   getID(): Observable<any> {
    return this.subjectId.asObservable();
  }
/// end get id from list

  /// get product from details Component
  getproductById(id: string) {
    return this.http.get<Product>(this.endpoint + `/Product/${id}`);
  }
  /// get product from details Component

  getAllporduct() {
    return this.http.get<Product[]>(this.endpoint + '/Product');
  }

  saveNewProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(this.endpoint + '/Product', p)
  }


  deleteProductByid(id: string ) {


    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'});

    return this.http.delete(this.endpoint+`/Product/DeleteProd/${id}` ,{headers: headers})

  }
}
