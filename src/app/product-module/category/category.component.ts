import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {NbIconConfig, NbMenuItem, NbTagComponent, NbTagInputAddEvent, NbToastrService} from "@nebular/theme";
import {PropertyService} from "../property.service";
import {Property} from "../property.model";
import Swal from "sweetalert2";

export interface p {
  id: string
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  name = 'Open source: ngx awesome popup';
  CategoriesTab: any

  constructor(  private toastrService: NbToastrService,private categoryserv: CategoryService, private propertysService: PropertyService) {
  }

  settings = {
    tableProps: "{  striped: true, responsive: true }",
    mode: "external",
    actions: {
      add: false,
      position: 'right',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i  class="task  nb-trash"></i>',
    },

    columns: {
      nom: {
        title: 'nom',
        type: 'string',
      },

      description: {
        title: 'Description',
        type: 'string',
      },

    }
  }

    items = [
      {title: 'Ajouter Product', url: "/"}, ,
      {title: 'List des produits', url: "/"}, ,
      {title: 'Ajouter Variant'},
    ];

    addcatform = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      parentId: new FormControl('', [Validators.required]),
      properties: new FormControl('', [Validators.required])
    });

    isSubCategory!
:
  boolean;
  categoryList: Category[] = [];
  propertysList: Property[] = [];

  ngOnInit(): void {
    this.init();
    this.propertysService.getPropertys().subscribe({
      next: (data) => {
        this.propertysList = data
        console.log(this.propertysList)
        //   this.propertysList.push(...data.map((one)=>{return one.name}))
      }
    })

  }

  init() {
    this.categoryserv.getAllCategory().subscribe(
      (res) => {
        this.categoryList = res;
        console.log(res)
        res.forEach((d) => {
          if (d.subCategory.length > 0) {
            this.it.push({
              title: d.nom,
              icon: 'plus-outline',
              children: d.subCategory.map((d) => {
                return {title: d.nom}
              })
            })
          }
          if (d.subCategory.length == 0) {
            this.it.push({
              title: d.nom,
            })
          }
        });
      })
  }

  onsubmit() {


    console.log(this.addcatform.getRawValue())
    if (!this.isSubCategory) {
      this.addcatform.controls['parentId'].setValue(null);
      console.log("logging")
    }
    let properties: p[] = []
    let proform = this.addcatform.controls['properties'].value as []
    proform.forEach((v: any) => {
      properties.push({id: v.propertyId})
    })
    this.addcatform.controls['properties'].setValue(properties);
    console.log("From", this.addcatform.getRawValue());
    console.log("Properties", properties);

    this.categoryserv.addCtegory(this.addcatform.getRawValue()).subscribe({
      next: (res) => {
        console.log("add", res)
        this.init();
        this.addcatform.reset()
      }, error: (r) => {
        console.log(r)
      }
    })
    console.log(this.addcatform.getRawValue())

  }


  deletecategories(id: string) {

    this.categoryserv.deleteCategory(id).subscribe({
      next: (res) => {
        console.log(res)
        this.init();
      },
      error: (err) => {
        console.log(err)
      }
    })
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0095ff',
      cancelButtonColor: '#ff3d71',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryserv.deleteCategory(id).subscribe({
          next: (res) => {

            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            console.log(res)
            this.init(); },
          error: (er) => {
            const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: "danger"};
            this.toastrService.show(' catégorie est utiliser  pour un produit ou a des sous categories', `action de Suppression`, iconConfig)

          }
        });

      }
    })



  }


  it: NbMenuItem[] = [];

  editrole($event: any) {

  }

  deleteRole($event: any) {

  }
}
