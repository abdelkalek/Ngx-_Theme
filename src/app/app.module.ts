import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbLayoutModule,
  NbSidebarModule,
  NbToastrModule,
  NbMenuModule, NbIconModule, NbCardModule, NbTabsetModule, NbToggleModule, NbButtonModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import {HttpClientModule} from "@angular/common/http";
import {NgxEditorModule} from "ngx-editor";
import { DetailsUtilisateurComponent } from './pages/details-utilisateur/details-utilisateur.component';
import {BreadcrumbModule} from "xng-breadcrumb";

@NgModule({
  declarations: [AppComponent, DetailsUtilisateurComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    HttpClientModule,
    NgxEditorModule,
    NbEvaIconsModule,
    NbIconModule,
    BreadcrumbModule,
    NbCardModule,
    NbTabsetModule,
    NbToggleModule,
    NbButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
