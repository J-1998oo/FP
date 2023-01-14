import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

const MatImports = [MatToolbarModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, ...MatImports],
  exports: [HeaderComponent],
})
export class HeaderModule {}
