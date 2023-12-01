import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {
  //Se crea las columnas de la tabla
  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  datasource = new MatTableDataSource<any>(this.data);
  pokemons = [];
  //paginador
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  constructor(private PokeService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(){
    let pokemonData;
    
    for(let i = 1; i <= 150; i++ ){
        this.PokeService.getPokemons(i).subscribe(
          res => {
            console.log(res);
          },
          err=>{
    
          }
        );
      }

      }
      
}
