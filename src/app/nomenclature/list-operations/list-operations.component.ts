import { Component, OnInit } from '@angular/core';
import {Machine} from "../list-machines/machine.model";
import {MachinesService} from "../list-machines/machines.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-operations',
  templateUrl: './list-operations.component.html',
  styleUrls: ['./list-operations.component.scss']
})
export class ListOperationsComponent implements OnInit {

  listMachines: Machine[] = [];
  items = [
    {title: 'Ajouter machine', url: "/"},
    {title: 'Ajouter of'},
    {title: 'Ajouter fiche of'},
  ];
  vue = "List"
  constructor(private machineservice: MachinesService, private router: Router, private route: ActivatedRoute,private datePipe: DatePipe ) {
  }

  selectedRows: any;

  ngOnInit(): void {
    this.vue;
    this.machineservice.getAllMachines().subscribe((res) => {
      this.listMachines = res
    })
  }
  settings = {
    tableProps :"{  striped: true, responsive: true }",

    mode: "external",
    actions: {
      add: true,
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    edit: {
      editButtonContent: '<img alt="view" class="text-success" src="assets/icons/view.svg" width="20" height="20" >',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },

    columns: {
      reference: {
        title: 'Reference',
        type: 'html',
        valuePrepareFunction: (Reference:string) =>{
          return `<label  class="badge  label text-light   bg-success" >${Reference}</label>`;
        }},
      nom: {
        title: 'Nom   ',
        type: 'string',
      },
      date_panne: {
        title: 'Date de panne',
        type: 'html',
        valuePrepareFunction: (date_panne: string | number | Date) => {
          var raw = new Date(date_panne);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return`<span class="badge  label  text-light bg-danger">${formatted} </span>`;;
          ;
        },
      },
      prix: {
        title: 'Prix de vente',
        type: 'string',
      },
      taux_am: {
        title: 'Taux d\'amortissement',
        type: 'html',
        valuePrepareFunction: (amortissement:number) =>
        {
          if(amortissement > 0 &&  amortissement <=5){
            return`<span class="badge  label  text-light bg-info">${amortissement} %</span>`;
          }else
          if (amortissement > 5 &&  amortissement <=10)
          {
            return`<span class="badge label text-light bg-primary">${amortissement} %</span>`;

          }else
          if (amortissement > 10 &&  amortissement <=20)
          {
            return`<span class="badge label text-light  bg-warning">${amortissement} %</span>`;
          }
          return`<span class=" badge label text-light bg-secondary">${amortissement} % </span>`;

        },
      },
      cout_font: {
        title: 'coût de fonctionnement ',
        type: 'string',
      },
      cout_reglage: {
        title: 'prix du réglage ',
        type: 'string',
      }
    },
  };

  // UserRowSelected Event handler
  onRowSelect(event: any) {
    this.selectedRows = event.selected;
  }
  onEditConfirm($event: any) {
    console.log("delete")
  }


  editFunction($event: any) {
    console.log('Edit Item', $event.data.id)
    this.router.navigate(['machine',$event.data.id], {relativeTo: this.route}) .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
    // this.productService.sendId($event.data.id);

  }

  deleteItem($event: any) {
    console.log('Delete Item', $event.data.id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.machineservice.deleteMachine($event.data.id).subscribe({
          next : (res) =>{
            console.log(res)
            this.machineservice.getAllMachines().subscribe((res) => {
              this.listMachines = res
            })
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

          }, error : (err) =>{
            console.log(err)

            Swal.fire(
              'Erreur ',
              'Erreur lors de la suppression de produit',
              'error'
            )
          }
        })

      }
    })

  }
  createNewProd() {
    console.log('Add New Item')
    this.router.navigate(['./ajouter'], {relativeTo: this.route});

  }
  changeVue(veuType: string) {
    this.vue = veuType;
  }

  onSearch(value: string) {

  }
}
