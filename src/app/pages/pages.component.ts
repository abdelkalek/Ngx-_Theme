import { Component } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  template: `
    <ngx-one-column-layout>
        <nb-menu  tag="menu" [items]="menu" autoCollapse="true" ></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
}
