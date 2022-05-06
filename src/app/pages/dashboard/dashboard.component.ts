import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService } from '../../_core/_services/catalog.service';
import { Marca } from '../interfaces/marca';
import { Submarca } from '../interfaces/submarca';
import { Modelo } from '../interfaces/modelo';
import { DescripcionModelo } from '../interfaces/descripcion.modelo';
import { Colonia } from '../interfaces/colonia';

@Component({
  selector: 'app-welcome',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isCollapsed                                 = false;
  filtro                                      = "1";
  idAplication                                = 2;
  nombreCatalogoMarca                         = "Marca";
  nombreCatalogoSubMarca                      = "Submarca";
  nombreCatalogoModelo                        = "Modelo";
  nombreCatalogoDescripcionModelo             = "DescripcionModelo";
  nombreCatalogoCodigoPostal                  = "Sepomex";
  validateForm!: FormGroup;
  listMarcas: Marca[]                         = [];
  selectedValueMarca                          = null;
  listSubmarcas: Submarca[]                   = [];
  selectedValueSubMarca                       = null;
  listModelo: Modelo[]                        = [];
  selectedValueModelo                         = null;
  listDescripcionModelo: DescripcionModelo[]  = [];
  selectedValueDescripcionModelo              = null;
  valueCP                                     = null;
  valueEstado                                 = null;
  valueMunicipio                              = null;
  listColonias: Colonia[]           = [];
  selectedValueColonia                        = null;

  constructor(private fb: FormBuilder, private catalogService: CatalogService) { }

  ngOnInit() {
    this.catalogService.catalog(this.nombreCatalogoMarca,this.filtro, this.idAplication ).subscribe({
        next: data => {
          let that = this;
          JSON.parse(data.CatalogoJsonString).forEach(function(value: Marca) {
            that.listMarcas.push(value);
          });   
        },
        error: err => {
          console.log("Ocurrio un error");
        }
      });
     
      this.validateForm = this.fb.group({
        selectMarca: [null, [Validators.required]],
        selectSubmarca: [null, [Validators.required]],
        selectModelo: [null, [Validators.required]],
        selectDescripcion: [null, [Validators.required]],
        inputCodigoPostal: [null, [Validators.required]],
        inputEstado: [null, [Validators.required]],
        inputMunicipio: [null, [Validators.required]],
        selectColonia: [null, [Validators.required]],
      });
  }

  ChangedMarca(filtro: string){
    if(filtro == null){
      this.listSubmarcas                    = [];
      this.selectedValueSubMarca            = null;
      this.listModelo                       = [];
      this.selectedValueModelo              = null;
      this.listDescripcionModelo            = [];
      this.selectedValueDescripcionModelo   = null;
    }else{
      this.catalogService.catalog(this.nombreCatalogoSubMarca,filtro, this.idAplication ).subscribe({
        next: data => {
          let that = this;
          JSON.parse(data.CatalogoJsonString).forEach(function(value: Submarca) {
            that.listSubmarcas.push(value);
          });   
        },
        error: err => {
          console.log("Ocurrio un error");
        }
      });
    }
  }

  ChangedSubmarca(filtro: string){
    if(filtro == null){
      this.listModelo                       = [];
      this.selectedValueModelo              = null;
      this.listDescripcionModelo            = [];
      this.selectedValueDescripcionModelo   = null;
    }else{
      this.catalogService.catalog(this.nombreCatalogoModelo,filtro, this.idAplication ).subscribe({
        next: data => {
          let that = this;
          JSON.parse(data.CatalogoJsonString).forEach(function(value: Modelo) {
            that.listModelo.push(value);
          });   
        },
        error: err => {
          console.log("Ocurrio un error");
        }
      });
    }
  }

  ChangedModelo(filtro: string){
    if(filtro == null){
      this.listDescripcionModelo            = [];
      this.selectedValueDescripcionModelo   = null;
    }else{
      this.catalogService.catalog(this.nombreCatalogoDescripcionModelo,filtro, this.idAplication ).subscribe({
        next: data => {
          console.log(JSON.parse(data.CatalogoJsonString));
          let that = this;
          JSON.parse(data.CatalogoJsonString).forEach(function(value: DescripcionModelo) {
            that.listDescripcionModelo.push(value);
          });   
        },
        error: err => {
          console.log("Ocurrio un error");
        }
      });
    }
  }
  
  SearchPostal(filtro: string){
    if(filtro == null){
      this.listColonias          = [];
      this.selectedValueColonia  = null;
    }else{
      if(filtro.length >= 5){
        this.catalogService.catalog(this.nombreCatalogoCodigoPostal,filtro, this.idAplication ).subscribe({
          next: data => {
            let that = this;
            if(data.CatalogoJsonString){
              JSON.parse(data.CatalogoJsonString).forEach(function(value: any) {
                  that.valueMunicipio = value.Municipio.sMunicipio;
                  that.valueEstado    = value.Municipio.Estado.sEstado;
                  value.Ubicacion.forEach(function(colonia: Colonia) {
                    that.listColonias.push(colonia);
                  });  
              });  
            } 
          },
          error: err => {
            console.log("Ocurrio un error");
          }
        });
      }
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
