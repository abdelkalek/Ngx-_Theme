import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../category.model";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  name = 'Open source: ngx awesome popup';

  constructor(private categoryserv: CategoryService) {
  }

  items = [
    {title: 'Ajouter Product', url: "/"}, ,
    {title: 'List des produits', url: "/"}, ,
    {title: 'Ajouter Variant'},
  ];

  addcatform = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    parentId: new FormControl('', [Validators.required])
  });

  isSubCategory!: boolean;
  categoryList: Category[] = [];


  ngOnInit(): void {
    this.init();

  }

  init() {
    this.categoryserv.getAllCategory().subscribe(
      (res) => {
        this.categoryList = res;
      })
  }

  onsubmit() {
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
}
