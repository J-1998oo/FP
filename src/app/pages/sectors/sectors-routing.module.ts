import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorsComponent } from './sectors/sectors.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'secrors',
    pathMatch: 'full',
  },
  {
    path: 'secrors',
    component: SectorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorsRoutingModule {}
