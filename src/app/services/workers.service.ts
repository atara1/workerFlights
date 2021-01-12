import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkerInfo, WorkerInformation } from './../../assets/workersTypes';

const WORKER_INFORMATION_URL = 'https://interview-mock.herokuapp.com/api/workers/';
const WORKER_LIST_URL = 'https://interview-mock.herokuapp.com/api/workers/';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  constructor(private httpClient: HttpClient) { }

  public getWorkersList(): Observable<WorkerInfo[]> {
    return this.httpClient.get(WORKER_LIST_URL)
      .pipe(map((res: WorkerInfo[]) => res));
  }

  public getWorkerInformation(workerId: number): Observable<WorkerInformation[]> {
    return this.httpClient.get(`${WORKER_INFORMATION_URL}${workerId}`)
      .pipe(map((res: WorkerInformation[]) => res));
  }

}
