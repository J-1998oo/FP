import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs';
import { NavMenuDto } from 'src/app/core/dto/nav-menu';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NavService } from 'src/app/core/services/sid-nav/nav.service';

@Component({
  selector: 'app-sid-nav',
  templateUrl: './sid-nav.component.html',
  styleUrls: ['./sid-nav.component.css']
})
export class SidNavComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  navMenu: NavMenuDto;
  userData: any;

  loading = true;
  constructor(
    private breakpoint: BreakpointObserver,
    private _sideNav: NavService,
    private _authService: AuthService
  ) {
    this.navMenu = this._sideNav.getNavMenu();
    console.log(this.navMenu);
  }

  ngAfterViewInit(): void {
    this.breakpoint
      .observe(['(max-width:750px'])
      .pipe(delay(1))
      .subscribe((value: BreakpointState) => {
        if (value.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  ngOnInit(): void {
    this.getuserInfo();
  }
  getuserInfo() {
    this._authService.userInfo.subscribe((user: any) => {
      this.userData = user;
      console.log(this.userData);
      if (this.userData.role) {
        this.loading = false;
      }
    });
  }

  logOutBtn() {
    this._authService.logout();
  }
}
