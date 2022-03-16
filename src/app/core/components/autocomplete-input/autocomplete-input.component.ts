import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.searchData('bug');
  }

  async searchData(searchValue: string) {
    this._apiService.getData('issues', searchValue)
      .then((data) => {
        console.log(data)
      })
      .catch((e) => {
        console.error(e)
      });
  }
}
