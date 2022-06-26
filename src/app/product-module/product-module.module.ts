import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModuleRoutingModule } from './product-module-routing.module';
import { AccueilporductComponent } from './accueilporduct/accueilporduct.component';
import { AddProductComponent } from './add-product/add-product.component';
import {
  NbAccordionModule,
  NbAlertModule, NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbIconModule, NbInputModule, NbListModule, NbMenuModule,
  NbRadioModule, NbSelectModule, NbTabsetModule, NbTagModule, NbToggleModule, NbTooltipModule
} from "@nebular/theme";
import {BreadcrumbModule} from "xng-breadcrumb";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { ProductDetailsComponent } from './product-details/product-details.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoryComponent } from './category/category.component';
import { PropertyComponent } from './property/property.component';
import { ListProductsComponent } from './list-products/list-products.component';
import {NgxEditorModule} from "ngx-editor";
import {NgxSelectModule} from "ngx-select-ex";
import {TagInputModule} from "ngx-chips";


@NgModule({
  declarations: [
    AccueilporductComponent,
    AddProductComponent,
    ProductDetailsComponent,
    CategoryComponent,
    PropertyComponent,
    ListProductsComponent
  ],
    imports: [
        CommonModule,
        ProductModuleRoutingModule,
        NbCardModule,
        NbIconModule,
        BreadcrumbModule,
        Ng2SmartTableModule,
        NbButtonModule,
        NbContextMenuModule,
        NbCheckboxModule,
        NbRadioModule,
        NbInputModule,
        NbSelectModule,
        NbTabsetModule,
        NgxDropzoneModule,
        NbTagModule,
        ReactiveFormsModule,
        NbTooltipModule,
        NbAlertModule,
        NbAccordionModule,
        NbToggleModule,
        NbMenuModule,
        NbListModule,
        NbButtonGroupModule,
        FormsModule,
      NgxSelectModule,
      TagInputModule,
      NgxEditorModule.forRoot({
        locals: {
          bold: 'Bold',
          italic: 'Italic',
          code: 'Code',
          underline: 'Underline',

        },
      })
    ]
})
export class ProductModuleModule { }
