import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {NbComponentStatus, NbDialogService, NbIconConfig, NbToastrService} from "@nebular/theme";
import {CategoryService} from "../category.service";
import {Category} from "../category.model";
import {ProductService} from "../product.service";
import {PropertyService} from "../property.service";
import {VariantService} from "../variant.service";
import { Editor } from 'ngx-editor';

export const NUMERIC_PATTREN = '^-?[0-9]\\d*(\\.\\d{1,3})?$'; //accepts only 3 places after the point

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit , OnDestroy {
  submitted: boolean = false;
  checked = false;
  editor: Editor = new Editor();
  html = '';
  /*ngxlist*/
   items: any[] = [
    {
      id: 100,
      text: 'Austria',
      children: [
        {id: 54, text: 'Vienna'},
      ],
    },
    {
      id: 200,
      text: 'Belgium',
      children: [
        {id: 2, text: 'Antwerp'},
        {id: 9, text: 'Brussels'},
      ],
    },
    {
      id: 300,
      text: 'Bulgaria',
      children: [
        {id: 48, text: 'Sofia'},
      ],
    },
    {
      id: 400,
      text: 'Croatia',
      children: [
        {id: 58, text: 'Zagreb'},
      ],
    },
    {
      id: 500,
      text: 'Czech Republic',
      children: [
        {id: 42, text: 'Prague'},
      ],
    },
    {
      id: 600,
      text: 'Denmark',
      children: [
        {id: 13, text: 'Copenhagen'},
      ],
    },
    {
      id: 700,
      text: 'England',
      children: [
        {id: 6, text: 'Birmingham'},
        {id: 7, text: 'Bradford'},
        {id: 26, text: 'Leeds', disabled: true},
        {id: 30, text: 'London'},
        {id: 34, text: 'Manchester'},
        {id: 47, text: 'Sheffield'},
      ],
    },
    {
      id: 800,
      text: 'Finland',
      children: [
        {id: 25, text: 'Helsinki'},
      ],
    },
    {
      id: 900,
      text: 'France',
      children: [
        {id: 35, text: 'Marseille'},
        {id: 40, text: 'Paris'},
      ],
    },
    {
      id: 1000,
      text: 'Germany',
      children: [
        {id: 5, text: 'Berlin'},
        {id: 8, text: 'Bremen'},
        {id: 12, text: 'Cologne'},
        {id: 14, text: 'Dortmund'},
        {id: 15, text: 'Dresden'},
        {id: 17, text: 'Düsseldorf'},
        {id: 18, text: 'Essen'},
        {id: 19, text: 'Frankfurt'},
        {id: 23, text: 'Hamburg'},
        {id: 24, text: 'Hannover'},
        {id: 27, text: 'Leipzig'},
        {id: 37, text: 'Munich'},
        {id: 50, text: 'Stuttgart'},
      ],
    },
    {
      id: 1100,
      text: 'Greece',
      children: [
        {id: 3, text: 'Athens'},
      ],
    },
    {
      id: 1200,
      text: 'Hungary',
      children: [
        {id: 11, text: 'Budapest'},
      ],
    },
    {
      id: 1300,
      text: 'Ireland',
      children: [
        {id: 16, text: 'Dublin'},
      ],
    },
    {
      id: 1400,
      text: 'Italy',
      children: [
        {id: 20, text: 'Genoa'},
        {id: 36, text: 'Milan'},
        {id: 38, text: 'Naples'},
        {id: 39, text: 'Palermo'},
        {id: 44, text: 'Rome'},
        {id: 52, text: 'Turin'},
      ],
    },
    {
      id: 1500,
      text: 'Latvia',
      children: [
        {id: 43, text: 'Riga'},
      ],
    },
    {
      id: 1600,
      text: 'Lithuania',
      children: [
        {id: 55, text: 'Vilnius'},
      ],
    },
    {
      id: 1700,
      text: 'Netherlands',
      children: [
        {id: 1, text: 'Amsterdam'},
        {id: 45, text: 'Rotterdam'},
        {id: 51, text: 'The Hague'},
      ],
    },
    {
      id: 1800,
      text: 'Poland',
      children: [
        {id: 29, text: 'Łódź'},
        {id: 31, text: 'Kraków'},
        {id: 41, text: 'Poznań'},
        {id: 56, text: 'Warsaw'},
        {id: 57, text: 'Wrocław'},
      ],
    },
    {
      id: 1900,
      text: 'Portugal',
      children: [
        {id: 28, text: 'Lisbon'},
      ],
    },
    {
      id: 2000,
      text: 'Romania',
      children: [
        {id: 10, text: 'Bucharest'},
      ],
    },
    {
      id: 2100,
      text: 'Scotland',
      children: [
        {id: 21, text: 'Glasgow'},
      ],
    },
    {
      id: 2200,
      text: 'Spain',
      children: [
        {id: 4, text: 'Barcelona'},
        {id: 32, text: 'Madrid'},
        {id: 33, text: 'Málaga'},
        {id: 46, text: 'Seville'},
        {id: 53, text: 'Valencia'},
        {id: 59, text: 'Zaragoza'},
      ],
    },
    {
      id: 2300,
      text: 'Sweden',
      children: [
        {id: 22, text: 'Gothenburg'},
        {id: 49, text: 'Stockholm'},
      ],
    },
  ];

   ngxValue: any;

  /*endngXselect*/
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
        this.categoryList = res;
        console.log(res)
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

  open(dialog: TemplateRef<any>) {


    this.properties.removeAt(0);
    this.propertyser.getPropertysOfCategory(this.prodform.controls['categoryId'].value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.length == 0) {
          this.dialogService.open(dialog);
        }

        for (let i = 0; i < res.length; i++) {

          // res[i].name;
          this.properties.push(new FormGroup({
            propertyId: new FormControl(res[i].propertyId),
            value: new FormControl('')
          }));
        }
        this.dialogService.open(dialog);

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
