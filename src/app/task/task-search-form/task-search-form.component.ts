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
              ><b>Title or Description</b></label
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
              <b>Expiration Date From</b>
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
              <b>Expiration Date To</b>
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
              <b>Sort By</b>
            </label>
            <select id="orderBy" class="form-control" formControlName="orderBy">
              <option value="expirationDate" selected>Expiration Date</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div class="form-group col-lg-1">
            <button
              id="searchBtn"
              class="btn btn-block btn-warning"
              (click)="applyFilter($event)"
            >
              <i class="fa fa-search" aria-hidden="true"></i>
              <span> Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      #searchTaskFormContainer {
      }
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

  /**
   * Emit to the parent component the SearchFilters using the search form values.
   * @param event
   */
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
