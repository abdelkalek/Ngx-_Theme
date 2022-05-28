import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  NbMediaBreakpointsService, NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import {LayoutService} from '../../../@core/utils';
import {map, takeUntil} from 'rxjs/operators';
import {filter, Subject, Subscription} from 'rxjs';
import {AuthService} from "../../../auth/auth.service";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {User} from "../../../auth/User.model";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  private userSub: Subscription | undefined;
  private isAuthenticated = false
  email: string | undefined;
  role: string | undefined;
 changeIconTogel = true;
  changetheme = false;
  items: NbMenuItem[] = [
    {
      title: 'Profile',
      icon: 'person-outline',
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
    },
    {
      title: 'Privacy Policy',
      icon: {icon: 'checkmark-outline', pack: 'eva'},
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      hidden: this.isAuthenticated,
    },
  ];
  themes = [
    {
      value: 'default',
      name: 'Light Mode',
    },
    {
      value: 'dark',
      name: 'Dark Mode',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];


  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private nbMenuService: NbMenuService,
    private authSercvice: AuthService,
  ) {
  }

  ngOnInit() {
    this.changeThemeTogel();
    this.userSub = this.authSercvice.userAuth.subscribe(user => {
      //this.isAuthenticated = !user ? false: true;
      this.isAuthenticated = !!user;
      this.email = user?.email;
      this.role = user?.roleuser;
    });

    this.currentTheme = this.themeService.currentTheme;
    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));

    /*Add By Abdelkhalek**/


    this.nbMenuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'my-context-menu'),
        map(({item: {title}}) => title),
      )
      .subscribe(
        title => {
          console.log(`${title} was clicked!`)
          if (title == "Logout") {
            this.authSercvice.logout();

          }
        });

    /*End  By Abdelkhalek**/


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }
  changeThemeTogel(){
    this.changetheme = !this.changetheme;
    if(this.changetheme){
      this.themeService.changeTheme("default");
    }else{
      this.themeService.changeTheme("dark");

    }

  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
this.changeIconTogel = ! this.changeIconTogel;
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
