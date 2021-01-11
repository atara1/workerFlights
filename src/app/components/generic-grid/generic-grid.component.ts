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
export class GenericGridComponent {
  @Input() workerColumns: string[];
  @Input() workerData: WorkerInformation[];
  public gridOptions = {
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
  }

  public getSelectedRowData(selectedFlight: WorkerInformation): void {
    if (!!selectedFlight) {
      this.store.dispatch(flights.UpdateFlightInformation(selectedFlight));
    }
  }

}
