import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AutocompleteInputComponent } from './core/components/autocomplete-input/autocomplete-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutocompleteInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
