import { Injectable } from '@angular/core';
import { NavItemDto } from '../../dto/nav-item';
import { NavMenuDto } from '../../dto/nav-menu';

@Injectable({
  providedIn: 'root',
})
export class NavService {/*
  constructor() {}

  getNavMenu() {
    return new NavMenuDto('nav-menu', [
      new NavItemDto('Home', '', '/home'),
      new NavItemDto('Login', '', '/auth/login'),
      new NavItemDto('Dashboard', '', '/dashboard'),
      new NavItemDto('Products', '', '',[
        new NavItemDto('Add', '', '/products/add-products'),
      ])

    ]);
  } */

  constructor() {}

  getNavMenu(): NavMenuDto {
    return new NavMenuDto('NavMenu', [
      new NavItemDto('Startups', 'dashboard', '', '/startup'),
      new NavItemDto('Approval', 'dashboard', 'admin', '/approval'),
      new NavItemDto('Sectors', 'dashboard', 'admin', '/sectors'),
    ]);
  }

}
