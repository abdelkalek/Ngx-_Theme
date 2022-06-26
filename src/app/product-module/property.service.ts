import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Property} from "./property.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private endpoint = environment.endPointprod;

  constructor(private http: HttpClient) {
  }
  getPropertysOfCategory(id: string) {

    return this.http.post<Property[]>(this.endpoint + '/Property/getPropertysOfCategory' , { id});
  }
  getPropertys() {
    return this.http.get<Property[]>(this.endpoint +'/Property/');
  }
  addNewProperty(property: Property) : Observable<Property>{
return   this.http.post<Property>(this.endpoint , property)
  }
  deleteProperty(id: string ) : Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'});
    return this.http.delete(this.endpoint+`/Property/DeleteProperty/${id}`,{headers: headers});
  }


}
