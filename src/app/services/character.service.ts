import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Species } from '../interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class CharacterService {

  characters: any[] = [];
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1) {
    return axios.get(`${this.apiUrl}/character?page=${page}`);
  }

  searchCharactersByName(name: string) {
    return axios.get(`${this.apiUrl}/character?name=${name}`);
  }

  getCharactersByGender(gender: string) {
    return axios.get(`${this.apiUrl}/character?gender=${gender}`);
  }

  getCharacterBySpecies(species: string){
    return axios.get(`${this.apiUrl}/character?species=${species}`)
  }









}
