import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;

  public options: any = [];

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.setListener();
  }

  setListener() {
    fromEvent(this.searchInput?.nativeElement, 'keyup')
    .pipe(
      debounceTime(500),
      map((event: any) => event.target.value)
    )
    .subscribe(value => this.searchData(value));
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
