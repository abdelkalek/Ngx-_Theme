import {Component, OnInit} from '@angular/core';
import {PropertyService} from "../property.service";
import {Property} from "./property.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {NbComponentStatus, NbTagComponent, NbTagInputAddEvent, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  constructor(private propertService: PropertyService,private categoryserv: CategoryService,private toastrService: NbToastrService) {
  }
  categoryList: Category[] = [];

  ListProperty?: Property[];
  ListpropertyofCategory?: Property[];
  propertyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    unite: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })
  bindForm=  new FormGroup({
    categoryId: new FormControl('', [Validators.required]),
    propertyId: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.propertService.getPropertys().subscribe(
      {
        next: (prs) => {
          this.ListProperty = prs;
          console.log(prs)
        }, error: (err) => {
          console.log(err.message)
        }
      }
    )
    this.categoryserv.getAllCategory().subscribe(
      (res) => {
        this.categoryList = res;
      })

  }

  selectedRows: any;
  settings = {
    // mode: "external",
    actions: {
      // custom: [
      //   {
      //     name: 'edit',
      //     title: '<i class="nb-heart" title="YourAction"></i>'
      //   }],
      add: false,
      // edit: false,
      // delete: false,
      position: 'right',

    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {

      name: {
        title: 'Nom',
      },
      description: {
        title: 'Description',
      },
      unite: {
        title: 'Unité',
      },
    },
  };



  // UserRowSelected Event handler
  onRowSelect(event: any) {
    this.selectedRows = event.selected;
  }

  // Get Selected button click handler

  onClick() {
    // It will console all the selected rows
    console.log(this.selectedRows);
  }

  onDeleteConfirm(event: any) {
    console.log("Delete Event In Console")
    console.log(event.data.propertyId)
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0250c0',
      cancelButtonColor: '#ce2626',
      confirmButtonText: 'Oui , supprime-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.propertService.deleteProperty(event.data.propertyId).subscribe({
          next : (res) =>{
            console.log(res)
            this.ngOnInit()
            Swal.fire(
              'suppression!',
              'la propriété est supprimé avec succès.',
              'success'
            )
          }, error : (err) =>{
            console.log(err)
            Swal.fire(
              'Erreur ',
              'Impossible de supprimer la propriété',
              'error'
            )
          }
        })

      }
    })





  }

  onCreateConfirm(event: any) {
    console.log("Create Event In Console")
    console.log(event);

  }

  onSaveConfirm(event: any) {
    console.log("Edit Event In Console")
    console.log(event);
  }


  submit() {
    console.log(this.propertyForm.getRawValue())
    this.propertService.addNewProperty(this.propertyForm.getRawValue()).subscribe({
      next: (res) => {
        console.log(res)    ,
          this.ngOnInit();
      }, error: (err) => {
        console.log(err.message)
      }

    })

}

  bindTocatgorie() {

    console.log(this.bindForm.getRawValue())
    console.log(this.bindForm.controls['categoryId'].value)
    this.categoryserv.BindtoProperty(this.bindForm.controls['categoryId'].value, this.bindForm.controls['propertyId'].value).subscribe({
      next:(data)=> {
        console.log(data)
      },
      error : (resError) =>{
        console.log(resError)
          this.toastrService.show(resError, `Properties `, {status :'danger'});
      }
    })
      this.propertService.getPropertysOfCategory(this.bindForm.controls['categoryId'].value).subscribe({
        next:(data)=> {
          console.log("ddazdza",data)
          this.ListpropertyofCategory = data ;
        }, error : (resError) =>{
          console.log(resError.message)
        }
      })
  }


///*tags info////
  trees: any[]= ['Red','blue'];

  // onTagRemove(tagToRemove: NbTagComponent): void {
  //   this.trees.delete(tagToRemove.text);
  // }
  //
  // onTagAdd({ value, input }: NbTagInputAddEvent): void {
  //   if (value) {
  //     this.trees.add(value)
  //   }
  //   input.nativeElement.value = '';
  // }
}
