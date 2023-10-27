import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Species } from '../interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class CharacterService {

  searchedName: string = '';
  characters: any[] = [];
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {
    // this.loadLocalStorage()
  }

  getCharacters(page: number = 1) {
    return axios.get(`${this.apiUrl}/character?page=${page}`);
  }

  searchCharactersByName(name: string) {
    this.searchedName = name;
    return axios.get(`${this.apiUrl}/character?name=${name}`);
  }

  getCharactersByGender(gender: string) {
    return axios.get(`${this.apiUrl}/character?gender=${gender}`);
  }

  getCharacterBySpecies(species: string){
    return axios.get(`${this.apiUrl}/character?species=${species}`)
  }

  getCharacterDetailsByName(name: string) {
    return axios.get(`${this.apiUrl}/character?name=${name}`);
  }
  getCharactersForPage(page: number = 1) {
    return axios.get(`${this.apiUrl}/character?page=${page}`);
  }


  // private organizeCharacter(name: string){
  //   name = name.trim().toLocaleLowerCase();
  //   if(this.characterHistory.includes(name)){
  //     this.characterHistory = this.characterHistory.filter((oldname)=>
  //     oldname !== name);
  //   }

  //   this.characterHistory.unshift(name);
  //   this.characterHistory = this.characterHistory.splice(0,10);
  //   this.seveLocalStorage();
  // }

  // private seveLocalStorage():void{
  //   localStorage.setItem('history', JSON.stringify(this.characterHistory));
  // }

  // private loadLocalStorage():void{
  //   if(!localStorage.getItem('history'))return;

  //   this.characterHistory = JSON.parse(localStorage.getItem('history')!);
  // }






}
