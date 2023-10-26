import { Component } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {

  characters: any[] = [];
  searchCharacter: string = '';
  currentPage: number = 1; // Página actual
  selectedSpecies: string = '';
  speciesList: any[] = [];


  constructor(private characterService: CharacterService) {}

  resetPage(){
    window.location.reload();
  }

  ngOnInit() {
    this.getCharacters();
    this.characterService.getCharacters().then((response) => {
      this.characters = response.data.results;
    });



  }

  getCharacters(page: number = 1) {
    this.characterService.getCharacters(page).then((response) => {
      this.characters = response.data.results;
      this.currentPage = page;
    });

  }


  loadCharacters() {
    this.characterService.getCharacters().then((response) => {
      this.characters = response.data.results;
    });
  }

  filterByGender(gender: string) {
    this.characterService.getCharactersByGender(gender).then((response) => {
      this.characters = response.data.results;
    });
  }



  filterBySpecies() {
    const species = this.selectedSpecies; // Obtiene la especie seleccionada del menú desplegable

    if (species) {
      this.characterService.getCharacterBySpecies(species).then((response) => {
        this.characters = response.data.results;
      });
    } else {
      this.loadCharacters(); // Muestra todos los personajes si no se selecciona una especie específica
    }
  }

  searchCharacters() {
    if (this.searchCharacter) {
      this.characterService.searchCharactersByName(this.searchCharacter).then((response) => {
        this.characters = response.data.results;
      });
    } else {
      this.loadCharacters();
    }
  }




}
