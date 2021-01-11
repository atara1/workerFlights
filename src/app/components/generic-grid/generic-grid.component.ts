import { Observable } from 'rxjs';
import { AppState } from './../../store/AppState';
import { WorkerInformation } from './../../../assets/workersTypes';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as flights from '../../store/actions/flights.action';

@Component({
  selector: 'app-generic-grid',
  templateUrl: './generic-grid.component.html',
  styleUrls: ['./generic-grid.component.scss']
})
export class GenericGridComponent implements OnInit {
  @Input() workerColumns: string[];
  @Input() workerData: WorkerInformation[];
  flightsSelected$: Observable<WorkerInformation>;
   gridOptions = {
    defaultColDef: {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    },
    suppressRowClickSelection: true,
    groupSelectsChildren: true,
    debug: true,
    rowSelection: 'multiple',
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    enableRangeSelection: true,
    paginationAutoPageSize: true,
    pagination: true,
  };

  constructor(private store: Store<AppState>) {
    this.flightsSelected$ = store.pipe(select('flights'));

   }

  ngOnInit(): void {
  }

  public getSelectedRowData(selectedFlight: WorkerInformation): void {
    console.log(selectedFlight);
    if (!!selectedFlight) {
      this.store.dispatch(flights.UpdateFlightInformation(selectedFlight));
    }
  }

}
