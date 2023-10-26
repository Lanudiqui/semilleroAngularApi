import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'form-search',
  template: `
    <input [(ngModel)]="searchCharacter" type="text"
    class="form-control"
    placeholder="Search Character">
    <button (click)="searchCharacters()" class="btn btn-warning">Search</button>
  `

})
export class FormSearchComponent implements OnInit {

  characters: any[] = [];
  searchCharacter: string = '';

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.characterService.getCharacters().then((response) => {
      this.characters = response.data.results;
    });
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
