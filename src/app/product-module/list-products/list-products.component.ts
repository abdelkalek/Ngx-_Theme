import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  productTab: Product[] = [];
  items = [
    {title: 'Ajouter Product', url: "/"},
    {title: 'Ajouter Category'},
    {title: 'Ajouter Variant'},
  ];
  vue = "List"
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute,) {
  }

  selectedRows: any;

  ngOnInit(): void {
    this.vue;
    this.productService.getAllporduct().subscribe((res) => {
      this.productTab = res
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
      editButtonContent: '<i class="nb-gear"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },

    columns: {
      /*  urlImage: {
          title: 'Image',
          type: 'html',
          valuePrepareFunction: (urlImage:string) =>
          {
            return`<img width="50px" src="${urlImage}" />`; },
        },*/
      ref: {
        title: 'Reference',
        type: 'string',
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      typeProd: {
        title: 'Type',
        type: 'html',
        valuePrepareFunction: (typeProd:string) =>
        {
          if(typeProd=="produit fini"){
            return`<span class="badge bg-success">${typeProd}</span>`;
          }else
          if (typeProd=="matières premières")
          {
            return`<span class="badge bg-primary">${typeProd}</span>`;

          }
          return`<span class="lead badge bg-secondary">${typeProd}</span>`;

        },
      },
      lastPrix: {
        title: 'Prix de vente',
        type: 'string',
      },

      cout: {
        title: 'Cout d\'achat ',
        type: 'string',
      },/*
      poids: {
        title: 'Poids ',
        type: 'string',
      },
      volume: {
        title: 'Volume ',
        type: 'string',
      }*/
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
    this.router.navigate(['../details'], {relativeTo: this.route}) .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
    this.productService.sendId($event.data.id);

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
        this.productService.deleteProductByid($event.data.id).subscribe({
          next : (res) =>{
            console.log(res)
            this.productService.getAllporduct().subscribe((res) => {
              this.productTab = res
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
    this.router.navigate(['../add'], {relativeTo: this.route});

  }
  changeVue(veuType: string) {
    this.vue = veuType;
  }
}
