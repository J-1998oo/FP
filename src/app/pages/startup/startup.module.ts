import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup/startup.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddStartupComponent } from './pages/add-startup/add-startup.component';
import { UpdateStartupComponent } from './pages/update-startup/update-startup.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './pages/preview/preview.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RequistComponent } from './pages/requist/requist.component';
import { RouterModule } from '@angular/router';

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
  declarations: [
    StartupComponent,
    AddStartupComponent,
    UpdateStartupComponent,
    PreviewComponent,
    RequistComponent,
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MatImports,
  ],
  exports: [StartupComponent],
})
export class StartupModule {}
