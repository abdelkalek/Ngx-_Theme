import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "./product.model";
import {Category} from "./category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  endpoint = 'https://localhost:7025/api';

  constructor(private http: HttpClient) {
  }

  getAllCategory() {
    return this.http.get<Category[]>(this.endpoint + '/Category');
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
}
