import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbToastrModule,
  NbMenuModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
