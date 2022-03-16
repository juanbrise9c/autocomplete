import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getData(model: string, searchValue: any) {
    const query = encodeURI(`repo:angular/angular ${searchValue} in:title`);
    return this.http.get(`${this.url}${model}?q=${query}`).toPromise();
  }
}
