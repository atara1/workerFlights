import { WorkerInfo } from './../../../assets/workersTypes';
import * as usersSelectedWorker from '../actions/usersSelectedWorker.action';
import { createReducer, on, Action } from '@ngrx/store';


const defaultState: WorkerInfo = null;

const reducer = createReducer(
    defaultState,
    on(usersSelectedWorker.SelectedWorker, (state: WorkerInfo, newData: WorkerInfo) => {
        return newData;
    })
);

export function usersSelectedWorkerReducer(state: WorkerInfo | undefined, action: Action): WorkerInfo {
    return reducer(state, action);
}

