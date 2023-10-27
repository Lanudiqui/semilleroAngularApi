import { Component, ElementRef, ViewChild } from '@angular/core';
import { InternalAxiosRequestConfig } from 'axios';
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
  characterDetails: any;
  searchTerms: string[] = []; // Almacena los términos de búsqueda
  searchResults: any[] = []; // Almacena los resultados de las búsquedas
  searchedCharacters: any[] = [];
  maxButtonsToShow = 10;
  pageNumber: number = 0;
  searchedCharactersPage: any[] = [];
  selectedCharacter: string = '';
  searchTerm: string = ''; // Variable para almacenar el término de búsqueda
  uniqueSearchedCharacters: string[] = []; // Lista de nombres únicos de personajes buscados





  constructor(public characterService: CharacterService) {}

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
      // Realiza la búsqueda del personaje en la API utilizando el término de búsqueda
      this.characterService.searchCharactersByName(this.searchCharacter).then((response) => {
        this.characters = response.data.results;
      });

      // Verifica si el nombre buscado ya existe en la lista de nombres únicos
      if (!this.uniqueSearchedCharacters.includes(this.searchCharacter)) {
        // Agrega el nombre buscado a la lista de nombres únicos
        this.uniqueSearchedCharacters.push(this.searchCharacter);

        // Limita la lista de nombres únicos a un máximo de 10 elementos
        if (this.uniqueSearchedCharacters.length > 10) {
          this.uniqueSearchedCharacters.shift();
        }
      }
    }
  }



  searchCharacterByName(characterName: string) {
    if (characterName) {
      // Realiza la búsqueda del personaje en la API utilizando el nombre
      this.characterService.searchCharactersByName(characterName).then((response) => {
        this.characters = response.data.results;
      });
    }
  }


  showCharacter(characterName: string) {
    // Realiza una nueva búsqueda en la API utilizando el nombre del personaje
    this.characterService.searchCharactersByName(characterName)
      .then((response) => {
        // Verifica si se encontró un personaje con el nombre buscado
        if (response.data.results.length > 0) {
          // Obtén los detalles del primer personaje encontrado (puedes ajustar esto según tus necesidades)
          const selectedCharacter = response.data.results[0];

          // Almacena los detalles del personaje en una variable
          this.selectedCharacter = selectedCharacter;
        } else {
          // Si no se encontró el personaje, muestra un mensaje o maneja el caso apropiadamente
          console.log('Personaje no encontrado');
        }
      })
      .catch((error) => {
        // Maneja errores de la búsqueda, como problemas de red, aquí
        console.error('Error al buscar el personaje:', error);
      });
  }

  showCharacterDetails(characterName: string) {
    // Realiza una búsqueda en la API de Rick and Morty para obtener los detalles del personaje
    this.characterService.searchCharactersByName(characterName)
      .then((response) => {
        // Verifica si se encontró algún personaje con el nombre buscado
        if (response.data.results.length > 0) {
          // Obtén los detalles del primer personaje encontrado (puedes ajustar esto según tus necesidades)
          const foundCharacter = response.data.results[0];

          // Almacena los detalles del personaje en la variable selectedCharacter
          this.selectedCharacter = foundCharacter;
        } else {
          // Si no se encontró el personaje, muestra un mensaje o maneja el caso apropiadamente
          console.log('Personaje no encontrado');
        }
      })
      .catch((error) => {
        // Maneja errores de la búsqueda, como problemas de red, aquí
        console.error('Error al buscar el personaje:', error);
      });
  }





  changePage(change: number) {
  // Cambia la página actual según el botón previo o siguiente
  this.pageNumber += change;

  // Asegúrate de que la página no sea menor que 0 ni mayor que la cantidad de páginas disponibles
  this.pageNumber = Math.max(0, Math.min(this.pageNumber, Math.ceil(this.searchedCharacters.length / 10)));

  // Actualiza la página actual de tarjetas
  this.searchedCharactersPage = this.searchedCharacters.slice(this.pageNumber * 10, (this.pageNumber + 1) * 10);
}



getCharactersForPage(pageIndex: number) {
  const startIndex = pageIndex * 6;
  const endIndex = startIndex + 6;
  return this.characters.slice(startIndex, endIndex);
}

getCharacterInfo(characterName: string): string {
  // Busca el personaje por nombre en la lista de personajes
  const character = this.characters.find((char) => char.name === characterName);

  // Verifica si se encontró el personaje
  if (character) {
    // Construye una cadena con la información del personaje
    const info = `Name: ${character.name}, Status: ${character.status}, Species: ${character.species}, Gender: ${character.gender}`;
    return info;
  } else {
    // Si no se encuentra el personaje, muestra un mensaje de error
    return 'Personaje no encontrado';
  }
}












}
