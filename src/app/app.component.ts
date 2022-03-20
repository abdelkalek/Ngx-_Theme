import { Component } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  title = 'Control Plus';

  constructor(
    private menuService: NbMenuService
  ) {}

  ngOnInit(): void {
    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenuTag'),
        map(({ item: { title } }) => title)
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
