import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { CargarCurso } from '../interfaces/cargar-productos.interface';
import { Curso } from '../models/producto.model';
import { Observable, of } from 'rxjs';
import { RegisterCurso } from '../interfaces/register-curso';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  cargarCursos() {

    const url = `${ base_url }/cursos`;
    return this.http.get<CargarCurso>( url )
    .pipe(
      map( resp => {
        const cursos = resp.cursos.map( 
          prod => new Curso(prod.titulo,prod.descripcion,prod.valoracion,prod.autor,prod.img,prod.id)  
        );
        return {
          cursos
        };
      })
    )

  }

  eliminarCurso( curso:any) {
    
      // /usuarios/5eff3c5054f5efec174e9c84
      const url = `${ base_url }/cursos/${ curso }`;
      return this.http.delete(url);
  }

  crearCurso( formData: RegisterCurso ) {
    
    return this.http.post(`${ base_url }/cursos`, formData )
              .pipe(
                tap( (resp: any) => {
                  return resp
                })
        )

  }

}


