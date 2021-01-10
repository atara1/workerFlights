import { WorkerInformation } from './../../../assets/workersTypes';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() workerColumns: string[];
  @Input() workerData: WorkerInformation[];
  page = 1;
  pageSize = 10;
  collectionSize: number;

  constructor(){
  }
  ngOnInit(): void {
    this.collectionSize = this.workerData.length;
  }

}
