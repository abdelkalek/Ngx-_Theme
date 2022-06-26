import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {NbComponentStatus, NbDialogService, NbIconConfig, NbToastrService} from "@nebular/theme";
import {CategoryService} from "../category.service";
import {Category} from "../category.model";
import {ProductService} from "../product.service";
import {PropertyService} from "../property.service";
import {VariantService} from "../variant.service";
import {Editor} from 'ngx-editor';

export const NUMERIC_PATTREN = '^-?[0-9]\\d*(\\.\\d{1,3})?$'; //accepts only 3 places after the point

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  checked = false;
  editor: Editor = new Editor();
  html = '';
  /*ngxlist*/
  items: any[] = [];
  /*endngXselect*/
  prpertynameTab : any[] = [];
  prodform = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(9)]),
    ref: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required]),
    urlImage: new FormControl('', [Validators.required]),
    cout: new FormControl('', [Validators.required, Validators.pattern(NUMERIC_PATTREN)]),
    poids: new FormControl('', [Validators.required, Validators.pattern(NUMERIC_PATTREN)]),
    volume: new FormControl('', [Validators.required, Validators.pattern(NUMERIC_PATTREN)]),
    lastPrix: new FormControl('', [Validators.required, Validators.pattern(NUMERIC_PATTREN)]),
    typeProd: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    sku: new FormControl('', [Validators.required]),
    barcode: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    properties: new FormArray([new FormGroup({
      propertyId: new FormControl(''),
      value: new FormControl('')
    })])
  });
  categoryList: Category[] = [];

  constructor(private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private categoryserv: CategoryService,
              private prodserv: ProductService,
              private propertyser: PropertyService,
              private variantService: VariantService
  ) {
  }


  ngOnInit(): void {
    this.categoryserv.getAllCategory().subscribe(
      (res) => {
        //      this.categoryList = res;
        res.forEach((c) => {
          this.items.push({id: c.id, text: c.nom,children : c.subCategory.map((r)=>{ return {id:r.id,text:r.nom, children : r.subCategory.map((r)=>{ return {id:r.id,text:r.nom}})}})});
        })
        //    console.log(res)
      })
  }

  submit() {
    this.submitted = true;
    if (!this.prodform.valid) {
      this.showToast("danger", "Champs du formulaire sont vides ou erronés")
      return
    }
    console.log(this.prodform.getRawValue())

    this.variantService.AddNewVariant(this.prodform.getRawValue()).subscribe({
      next: (res) => {
        const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: "success"};
        this.toastrService.show('produit ajouté avec succès dans la liste des produits', `Produit ajouté`, iconConfig)
        console.log(res)
      }, error: (error) => {
        console.log(error)
        this.toastrService.show('message d\erreur :' + error.message, `Produit est ne pas Ajouté`, {status: 'danger'})

      }
    })


    /*   this.prodserv.saveNewProduct(this.prodform.getRawValue()).subscribe({
         next: (res) => {
           console.log(res)
           const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: "success"};
           this.toastrService.show('produit ajouté avec succès dans la liste des produits', `Produit ajouté`, iconConfig)

         },
         error: (err: any) => {
           console.log(err)
           this.toastrService.show('message d\erreur :' + err.message, `Produit est ne pas Ajouté`, {status: 'danger'})

         },
         complete: () => {
         },
       });*/
    this.prodform.reset();
  }

  showToast(status: NbComponentStatus, message: any) {
    this.toastrService.show("something went wrong authentication is required", `Erorrs: ${message}`, {status});
  }


  ///images handels methode
  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  open() {
    this.properties.clear()
    this.prpertynameTab = []
    this.properties.removeAt(0);
    console.log(this.prodform.controls['categoryId'].value)
    this.propertyser.getPropertysOfCategory(this.prodform.controls['categoryId'].value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.length == 0) {
        }
        this.prpertynameTab.push( ...res.map((r)=>{return r.name}));

        for (let i = 0; i < res.length; i++) {

          this.properties.push(new FormGroup({
            propertyId: new FormControl(res[i].propertyId),
            value: new FormControl('')
          }));

        }
        console.log(this.prpertynameTab)

      }, error: (erro) => {
        console.log("Error", erro.message)
      }
    })
  }

  get properties(): FormArray {
    return this.prodform.get('properties') as FormArray;
  }


  onSubmit() {

    console.log(this.properties.value);  // ['SF', 'NY']
    console.log(this.prodform.value);    // { cities: ['SF', 'NY'] }
  }


  ngOnDestroy(): void {
    //  this.editor.destroy();
  }
}
