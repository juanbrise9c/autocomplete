import { OnInit, AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

export interface configObject {
  model: string;
}

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;
  @Input()
  set config(config: configObject) {
    this.configObject = {...config};
  }

  public configObject: any = {};
  public options: any = [];
  public loading: boolean = false;
  public hidden: boolean = false;

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setListeners();
  }

  setListeners() {
    // Run "searchData" when the search bar changes
    fromEvent(this.searchInput?.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map((event: any) => event.target.value)
      )
      .subscribe(value => this.searchData(value));

    // Hide or show the autocomplete
    fromEvent(this.searchInput?.nativeElement, 'blur')
      .subscribe(value => this.hidden = !this.hidden);

    fromEvent(this.searchInput?.nativeElement, 'focus')
      .subscribe(value => { 
        if (this.options.length) this.hidden = !this.hidden 
      });
  }

  searchData(searchValue: string) {
    this.loading = true;
    this._apiService.getData(this.configObject.model, searchValue)
      .then((data: any) => {
        this.options = data?.items || [];
        this.loading = false;
      })
      .catch((e) => {
        console.error(e)
        this.loading = false;
      });
  }
}
