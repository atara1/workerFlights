import { WorkersService } from './../../services/workers.service';
import { WorkerInfo } from './../../../assets/workersTypes';
import { AppState } from './../../store/AppState';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as usersSelectedWorker from '../../store/actions/usersSelectedWorker.action';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit, OnDestroy {

  workerList: WorkerInfo[];
  usersSelectedWorker$: Observable<WorkerInfo>;
  private subscriptions: Subscription;
  constructor(private workersService: WorkersService, private store: Store<AppState>) {
    this.usersSelectedWorker$ = store.pipe(select('usersSelectedWorker'));
  }

  ngOnInit(): void {
   this.subscriptions = this.workersService.getWorkersList()
   .subscribe(list => {
      this.workerList = list;
    }, (error) => {
      console.log('error occure: ' , error);
    });
  }

  selectedWorker(workerSelected: WorkerInfo): void {
    if (!!workerSelected) {
      this.store.dispatch(usersSelectedWorker.SelectedWorker(workerSelected));
    }
  }

  @HostListener('window:unload', ['$event'])
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
