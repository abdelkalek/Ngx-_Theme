import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {NbMenuItem, NbTagComponent, NbTagInputAddEvent} from "@nebular/theme";
import {PropertyService} from "../property.service";
import {Property} from "../property.model";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  name = 'Open source: ngx awesome popup';

  constructor(private categoryserv: CategoryService, private propertysService: PropertyService) {
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
    lista: new FormControl('', [Validators.required])
  });

  isSubCategory!: boolean;
  categoryList: Category[] = [];
  propertysList: Property[] = [];
  ngOnInit(): void {
    this.init();
    this.propertysService.getPropertys().subscribe({
      next: (data)=>{
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
res.forEach((d)=>{
  if(d.subCategory.length > 0){
    this.it.push({
      title: d.nom,
      icon: 'plus-outline',
      children: d.subCategory.map((d)=>{return {title :d.nom  } })
    })
  }
  if(d.subCategory.length == 0){
    this.it.push({
      title: d.nom,
    })
  }
});})
  }

  onsubmit() {
    console.log(this.addcatform.getRawValue())
    return;
    if (!this.isSubCategory) {
      this.addcatform.controls['parentId'].setValue(null);
    }
    this.categoryserv.addCtegory(this.addcatform.getRawValue()).subscribe({
      next: (res) => {
        console.log("add", res)

        this.init();
        this.addcatform.reset()
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
  }


  it: NbMenuItem[] = [];

}
