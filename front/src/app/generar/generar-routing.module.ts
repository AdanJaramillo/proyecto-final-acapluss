import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GenerarPage } from './generar.page';



const routes: Routes = [
  {
    path: '',
    component: GenerarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarPageRoutingModule {}
