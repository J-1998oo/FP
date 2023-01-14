import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors/sectors.component';

@NgModule({
  declarations: [SectorsComponent],
  imports: [CommonModule, SectorsRoutingModule, RouterModule],
})
export class SectorsModule {}
