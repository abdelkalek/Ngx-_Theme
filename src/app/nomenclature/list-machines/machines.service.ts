import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Machine} from "./machine.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MachinesService {
  private endpoint = environment.endPointfab;

  constructor(private http: HttpClient) {
  }

  getAllMachines() {

    return this.http.get<Machine[]>(this.endpoint + '/Machine').pipe(map((machines: Machine[]) => {
      return machines
    }))

  }

  addMachine(machine: any) {
    return this.http.post<Machine>(this.endpoint + '/Machine', machine);
  }

  getMachineByid(id: string) {
    return this.http.get<Machine>(this.endpoint + '/Machine/' + id);
  }

  deleteMachine(id: string) {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'});
    return this.http.delete(this.endpoint + '/Machine/' + id, {headers: headers});
  }

  updateMachineByid(machine: any) {
    return this.http.put<Machine>(this.endpoint + '/Machine/Edit/' + machine.id, machine);
  }

}
