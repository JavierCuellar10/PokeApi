import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {
  displayedColumns: any[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  constructor(private pokeService: PokemonService, private router : Router) { } // Corregido aquí

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    for (let i = 1; i <= 150; i++) {
      this.pokeService.getPokemons(i).subscribe(
        res => {
          const pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };
          this.data.push(pokemonData);
          this.dataSource.data = this.data; // Corregido aquí
          this.dataSource.paginator = this.paginator as MatPaginator;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any){
    this.router.navigateByUrl(`pokeDetail/${row.position }`);
  }
}
