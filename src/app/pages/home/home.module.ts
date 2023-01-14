import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/core/components/layout/header/header.module';
import { HomeRoutingModule } from './home-routing.module';
import { PreviewStartupComponent } from './preview-startup/preview-startup.component';
import { HomeComponent } from './home/home.component';
import { StartupComponent } from './startup/startup.component';

const MatImports = [
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [HomeComponent, StartupComponent ,PreviewStartupComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    HomeRoutingModule,
    ...MatImports
    ],
})
export class HomeModule {}
