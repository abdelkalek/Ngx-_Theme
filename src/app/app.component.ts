import {Component, OnInit} from '@angular/core';
import {NbMenuService} from '@nebular/theme';
import {filter, map} from 'rxjs';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  title = 'Control Plus';
  constructor(private menuService: NbMenuService, private authService :AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.menuService
      .onItemClick()
      .pipe(
        filter(({tag}) => tag === 'userMenuTag'),
        map(({item: {title}}) => title)
      )
      .subscribe((title) => {
        switch (title) {
          case 'SignOut':
            break;
          default:
            break;
        }
      });
  }
}
