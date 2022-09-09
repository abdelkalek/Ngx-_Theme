import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";
import {AppComponent} from "./app.component";
import {NgxEditorModule} from "ngx-editor";

const routes: Routes = [
  {
    path: 'pages',
    //path: 'pages', canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.NgxAuthModule),
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
