import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {
  public options: any = [];

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.searchData('bug');
  }

  async searchData(searchValue: string) {
    this._apiService.getData('issues', searchValue)
      .then((data: any) => {
        this.options = data?.items || [];
      })
      .catch((e) => {
        console.error(e)
      });
  }
}
