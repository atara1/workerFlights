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

  ngOnInit(): void {
    console.log(this.workerColumns);
    console.log(this.workerData);
  }

}
