import { NbAuthComponent } from '@nebular/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  styleUrls: [ '../../../node_modules/@nebular/auth/components/auth.component.scss' ],
  template: `
    <nb-layout>
      <nb-layout-column>
<!--            <nb-auth-block>-->
              <router-outlet></router-outlet>
<!--            </nb-auth-block>-->
      </nb-layout-column>
    </nb-layout>
  `,
})
export class AuthComponent extends NbAuthComponent {}
