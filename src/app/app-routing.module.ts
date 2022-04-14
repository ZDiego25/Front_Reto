import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCursoComponent } from './components/admin-curso/admin-curso.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [

  { path: '', component: ProductosComponent, pathMatch: 'full' },
  { path: 'cursos', component: AdminCursoComponent},
  { path: '**', component: ProductosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
