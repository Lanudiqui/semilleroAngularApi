import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FormSearchComponent } from './shared/components/form-search/form-search.component';
import { CharacterListComponent } from './components/pages/character-list/character-list.component';
import { CharacterDetailsComponent } from './components/pages/character-details/character-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpeciesFilterComponent } from './components/pages/species-filter/species-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormSearchComponent,
    CharacterListComponent,
    CharacterDetailsComponent,
    SpeciesFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
