import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchFilters } from './../models/search-form';

@Component({
  selector: 'app-task-search-form',
  template: `
    <div id="searchTaskFormContainer">
      <form [formGroup]="searchForm">
        <div class="form-row">
          <div class="form-group col-lg-5">
            <label for="titleOrDescription" class="col-form-label"
              ><b>Titolo o Descrizione</b></label
            >
            <input
              class="form-control"
              id="titleOrDescription"
              type="text"
              formControlName="titleOrDescription"
            />
          </div>

          <div class="form-group col-lg-2">
            <label for="expirationDateFrom" class="col-form-label">
              <b>Data Scadenza da</b>
            </label>
            <input
              class="form-control"
              id="expirationDateFrom"
              type="date"
              formControlName="expirationDateFrom"
            />
          </div>

          <div class="form-group col-lg-2">
            <label for="expirationDateTo" class="col-form-label">
              <b>Data Scadenza a</b>
            </label>
            <input
              class="form-control"
              id="expirationDateTo"
              type="date"
              formControlName="expirationDateTo"
            />
          </div>

          <div class="form-group col-lg-2">
            <label for="orderBy" class="col-form-label">
              <b>Ordina per</b>
            </label>
            <select id="orderBy" class="form-control" formControlName="orderBy">
              <option value="expirationDate" selected>Data Scadenza</option>
              <option value="title">Titolo</option>
            </select>
          </div>

          <div class="form-group col-lg-1">
            <button
              id="searchBtn"
              class="btn btn-block btn-primary"
              (click)="applyFilter($event)"
            >
              <i class="fa fa-search" aria-hidden="true"></i>
              <span> Cerca</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      #searchBtn {
        margin-top: 2.4em;
      }
    `
  ]
})
export class TaskSearchFormComponent implements OnInit {
  searchForm: FormGroup = null;

  @Output() handleSearch: EventEmitter<SearchFilters> = new EventEmitter<
    SearchFilters
  >();

  constructor() {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      titleOrDescription: new FormControl(''),
      expirationDateFrom: new FormControl(''),
      expirationDateTo: new FormControl(''),
      orderBy: new FormControl('expirationDate')
    });

    this.applyFilter(null);
  }

  applyFilter(event: Event): void {
    const filters: SearchFilters = {
      titleOrDescription: this.searchForm.get('titleOrDescription').value,
      expirationDateFrom: this.searchForm.get('expirationDateFrom').value,
      expirationDateTo: this.searchForm.get('expirationDateTo').value,
      orderBy: this.searchForm.get('orderBy').value
    };
    this.handleSearch.emit(filters);
  }
}
