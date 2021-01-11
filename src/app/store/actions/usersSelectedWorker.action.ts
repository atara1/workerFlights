import { WorkerInfo } from './../../../assets/workersTypes';
import { createAction, props } from '@ngrx/store';


export const SelectedWorker = createAction(
    '[WorkerInfo] selectedWorker',
    props<WorkerInfo>()
);
