import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval/approval.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

const itemModul = [MatProgressSpinnerModule];
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
  declarations: [ApprovalComponent],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    RouterModule,
    ...itemModul,
    ...MatImports,
  ],
})
export class ApprovalModule {}
