import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Curso } from '../../models/producto.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: []
})
export class ProductosComponent implements OnInit, OnDestroy {

  public cursos: Curso[] = [];
  public hola: string = "";
  constructor(private productosService: ProductosService) { }

  ngOnDestroy(): void {
   
  }

  ngOnInit(): void {
    this.cargarCursos();
    console.log(this.hola);
  }

  cargarCursos() {

    this.productosService.cargarCursos()
        .subscribe( ({cursos}) => {
          console.log(cursos);
          this.cursos = cursos 
          this.hola = "HOLAAAAA"
          resolve();

        })

  }

}
