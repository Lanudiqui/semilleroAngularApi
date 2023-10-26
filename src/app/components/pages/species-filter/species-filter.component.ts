import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'species-filter',
  templateUrl: './species-filter.component.html',
  styleUrls: ['./species-filter.component.css']
})
export class SpeciesFilterComponent{

  selectedSpecies: string = '';

  constructor(private characterService: CharacterService) {}

  // filterBySpecies() {
  //   if (this.selectedSpecies === 'Alien') {
  //     this.characterService.getAlienCharacters().then((response) => {
  //       // Aquí puedes manejar la respuesta de personajes Alien
  //       console.log(response.data.results);
  //     });
  //   } else if (this.selectedSpecies === 'Human') {
  //     this.characterService.getHumanCharacters().then((response) => {
  //       // Aquí puedes manejar la respuesta de personajes Human
  //       console.log(response.data.results);
  //     });
  //   } else {
  //     // Maneja la lógica para mostrar todos los personajes si no se selecciona una especie específica
  //   }
  // }


}
