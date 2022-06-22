import { NbAuthComponent } from '@nebular/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  styleUrls: [ '../../../node_modules/@nebular/auth/components/auth.component.scss' ],
  template: `
    <nb-layout class="m-0" >
      <nb-layout-column class="m-0" >
              <router-outlet></router-outlet>
      </nb-layout-column>
      <nb-layout-footer class="m-0">
        <label class="subtitle">
          Tous droits réservés © 2022  Xenphon </label>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class AuthComponent extends NbAuthComponent {}
