import {Component, OnInit} from '@angular/core';
import {NbIconLibraries, NbMenuService} from '@nebular/theme';
import {filter, map} from 'rxjs';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  title = 'Xenphone';
  constructor(private menuService: NbMenuService, private authService :AuthService ,private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fab', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('regular', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('solid', { packClass: 'fas', iconClassPrefix: 'fa' });
  }
  ngOnInit(): void {


    //auatologin appel service
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
