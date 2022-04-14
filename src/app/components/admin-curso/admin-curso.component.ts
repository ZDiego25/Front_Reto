import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Curso } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-admin-curso',
  templateUrl: './admin-curso.component.html',
  styleUrls: ['./admin-curso.component.css']
})
export class AdminCursoComponent implements OnInit {

  public formSubmitted = false;
  public cargando: boolean = true;
  public cursos: Curso[] = [];
  public imgTemp: any = null;
  public imagenSubir!: File;

  public registerForm = this.fb.group({
    titulo: ['CURSO DE PHP', Validators.required ],
    descripcion: ['tLos mejores curso de sde cero', [ Validators.required] ],
    autor: ['Juan Carlos', Validators.required ],
    imagen: [null],
  });

  constructor( private fb: FormBuilder,
               private cursoService: ProductosService,
               private router: Router ) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  crearCurso() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      return;
    }

    // Realizar el posteo
    this.cursoService.crearCurso( this.registerForm.value )
        .subscribe( resp => {
          Swal.fire('Exito', resp, 'success' );
          // Navegar al Dashboard
          this.router.navigateByUrl('/');

        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });


  }

  cargarCursos() {
    this.cargando = true;
    this.cursoService.cargarCursos()
      .subscribe( ({ cursos}) => {
        this.cursos = cursos;
        console.log(this.cursos);
        this.cargando = false;
    })
  }

  eliminarCurso(curso:any) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar este curso`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.cursoService.eliminarCurso( curso )
          .subscribe( resp => {
            
            this.cargarCursos();
            Swal.fire(
              'Curso borrado',
              `Eliminado correctamente`,
              'success'
            );
            
          });

      }
    })
  }

  // campoNoValido( campo: string ): boolean {
    
  //   if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }

  // cambiarImagen( file: File ) {
  //   this.imagenSubir = file;

  //   if ( !file ) { 
  //     return this.imgTemp = null;
  //   }

  //   const reader = new FileReader();
  //   reader.readAsDataURL( file );

  //   reader.onloadend = () => {
  //     this.imgTemp = reader.result;
  //   }

  // }

}
